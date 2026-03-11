// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Header from './Header';
import './styles/Dashboard.css';

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          navigate('/login');
          return;
        }

        const userId = session.user.id;

        // 1. Get username
        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', userId)
          .maybeSingle();

        if (profileErr) throw profileErr;
        setUsername(profile?.username ?? null);

        // 2. Get pools user is part of
        const { data: poolMemberships, error: membershipErr } = await supabase
          .from('profile_pools')
          .select(`
            pool_id,
            pools (
              id,
              name,
              is_public,
              ruleset,
              created_by,
              created_at
            )
          `)
          .eq('profile_id', userId)
          .order('joined_at', { ascending: false });

        if (membershipErr) throw membershipErr;

        // Transform into usable pool list
        const userPools = poolMemberships.map((m) => {
          const p = m.pools;
          return {
            id: p.id,
            name: p.name,
            isPublic: p.is_public,
            ruleset: p.ruleset,
            isOwner: p.created_by === userId,
            createdAt: p.created_at,
            // Placeholder – replace with real logic later
            status: new Date(p.created_at) > new Date('2026-03-01') ? 'Active' : 'Ended',
            entries: 0, // TODO: count from profile_pools later
          };
        });

        setPools(userPools);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate('/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-page">
      
      <Header activeLink='pools' />

      <main className="dashboard-main">
        <div className="welcome-bar">
          <div>
            <h2>Welcome{username ? `, ${username}` : ''}!</h2>
            <p>Your active pools</p>
          </div>
          <div className="action-buttons">
            <button 
              className="btn primary large"
              onClick={() => navigate('/create-pool')}
            >
              Create Pool
            </button>
            <button 
            className="btn primary large"
            onClick={() => navigate('/join-pool')}
            >
              Join Pool
            </button>
          </div>
        </div>

        {pools.length === 0 ? (
          <div className="empty-state">
            <p>No pools yet</p>
            <p>Create or join one to start playing</p>
          </div>
        ) : (
          <div className="pools-grid">
            {pools.map(pool => (
              <div 
                key={pool.id} 
                className="pool-card"
                onClick={() => navigate(`/pools/${pool.id}`)}
              >
                <h3>{pool.name}</h3>
                <div className="pool-meta">
                  <span className="status">{pool.status}</span>
                  <span>{pool.isOwner ? 'Owner' : 'Member'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}