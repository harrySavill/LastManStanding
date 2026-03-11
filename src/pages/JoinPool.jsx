// src/pages/JoinPool.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Header from "./Header";
import './styles/JoinPool.css';

export default function JoinPool() {
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be signed in');

      // 2. Find pool by join_code
      const { data: pool, error: poolErr } = await supabase
        .from('pools')
        .select('id, name, is_public')
        .eq('join_code', joinCode.trim())
        .maybeSingle();

      if (poolErr) throw poolErr;
      if (!pool) throw new Error('Invalid join code');

      // 3. Check if already member
      const { data: existing } = await supabase
        .from('profile_pools')
        .select('profile_id')
        .eq('profile_id', user.id)
        .eq('pool_id', pool.id)
        .maybeSingle();

      if (existing) throw new Error('You are already in this pool');

      // 4. Join (insert into profile_pools)
      const { error: joinErr } = await supabase
        .from('profile_pools')
        .insert({
          profile_id: user.id,
          pool_id: pool.id,
        });

      if (joinErr) throw joinErr;

      setSuccess(`Joined "${pool.name}" successfully!`);
      setTimeout(() => navigate(`/pools/${pool.id}`), 1800);
    } catch (err) {
      setError(err.message || 'Failed to join pool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-pool-page">
      <Header  />

      <div className="join-container">
        <div className="join-card">
          <h2>Join a Pool</h2>
          <p className="subtitle">Enter the 8-character join code</p>

          <form onSubmit={handleJoin} className="join-form">
            <div className="join-form-group">
              <label htmlFor="joinCode">Join Code</label>
              <input
                id="joinCode"
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="XXXXXXXX"
                maxLength={8}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="btn primary large"
              disabled={loading || !joinCode.trim()}
            >
              {loading ? 'Joining...' : 'Join Pool'}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </div>
  );
}