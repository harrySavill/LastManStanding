import Header from "./Header";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./styles/ManagePool.css";

export default function ManagePool() {
  const { poolId } = useParams();
  const navigate = useNavigate();

  const [pool, setPool] = useState(null);
  const [members, setMembers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userErr,
        } = await supabase.auth.getUser();
        if (userErr || !user) throw new Error("Not authenticated");

        // Fetch pool data
        const { data: poolData, error: poolErr } = await supabase
          .from("pools")
          .select("*")
          .eq("id", poolId)
          .single();

        if (poolErr) throw poolErr;
        if (!poolData) throw new Error("Pool not found");

        setPool(poolData);
        setIsOwner(poolData.created_by === user.id);

        // Fetch members
        const { data: membersData, error: membersErr } = await supabase
          .from("profile_pools")
          .select(
            `
            profile_id,
            joined_at,
            profiles (
              id,
              username,
              full_name
            )
          `,
          )
          .eq("pool_id", poolId)
          .order("joined_at", { ascending: true });

        if (membersErr) throw membersErr;
        setMembers(membersData || []);
      } catch (err) {
        setError(err.message || "Failed to load pool");
      } finally {
        setLoading(false);
      }
    };

    fetchPool();
  }, [poolId]);

    if (loading) return <div className="loading">Loading pool...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!pool) return <div className="error">Pool not found</div>;
    if(!isOwner) return <div><Header/><div className="error">You are not the owner of this pool!</div></div>

  return (
    <div className="manage-pool-page">
      <Header />
      <div className="manage-pool-container">
        <form onSubmit={managePool} className="manage-pool-form">
          <h2 className="manage-pool-title">{pool.name}</h2>
        </form>
      </div>
    </div>
  );
}
