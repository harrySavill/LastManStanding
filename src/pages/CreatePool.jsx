import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Header from "./Header";
import "./styles/CreatePool.css";

export default function CreatePool() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    is_public: false,
    ruleset: "standard",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreatePool = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("You must be logged in");

      const { data, error } = await supabase
        .from("pools")
        .insert({
          name: formData.name.trim(),
          created_by: user.id,
          is_public: formData.is_public,
          ruleset: formData.ruleset,
        })
        .select("id, join_code, name")
        .single();

      if (error) throw error;

      await supabase.from("profile_pools").insert({
        profile_id: user.id,
        pool_id: data.id,
      });

      navigate(`/pools/${data.id}`);
    } catch (err) {
      setError(err.message || "Failed to create pool");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-pool-page">
    
      <Header activeLink='pools' />

      <div className="create-pool-container">
        <div className="create-pool-card">
          <h2 className="create-pool-header">Create a New Pool</h2>

          <form className="create-pool-form" onSubmit={handleCreatePool}>
            <div className="form-group">
              <label htmlFor="name">Pool Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Champions League 2025"
                maxLength={50}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ruleset">Ruleset</label>
              <select
                id="ruleset"
                name="ruleset"
                value={formData.ruleset}
                onChange={handleChange}
              >
                <option value="standard">Standard</option>
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_public"
                  checked={formData.is_public}
                  onChange={handleChange}
                />
                <span>Public pool (anyone can find and join)</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn primary large"
              disabled={loading || !formData.name.trim()}
            >
              {loading ? "Creating..." : "Create Pool"}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>

          <div className="form-footer">
          </div>
        </div>
      </div>
    </div>
  );
}