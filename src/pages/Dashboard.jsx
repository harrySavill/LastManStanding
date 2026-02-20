// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './styles/Dashboard.css'

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pools, setPools] = useState([]); // ← replace with real query later

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      // Get username
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) throw error;
        setUsername(data?.username ?? null);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }

      // TODO: Replace with real query once table exists
      // Example placeholder data
      setPools([
        { id: 1, name: 'Friends NFL 2026', status: 'Active', entries: 14 },
        { id: 2, name: 'Work Survivor League', status: 'Week 2', entries: 9 },
      ]);
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
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="logo">Survivor Pool</h1>
          
          <nav className="header-nav">
            <Link to="/pools" className="nav-link active">Pools</Link>
            <Link to="/profile" className="nav-link profile-icon">Profile</Link>
            <button onClick={handleSignOut} className="nav-link signout-btn">
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-bar">
          <div>
            <h2>Welcome{username ? `, ${username}` : ''}!</h2>
            <p>Your active pools</p>
          </div>
          <div className="action-buttons">
            <button className="btn primary large">Create Pool</button>
            <button className="btn primary large">Join Pool</button>
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
                onClick={() => navigate(`/pool/${pool.id}`)}
              >
                <h3>{pool.name}</h3>
                <div className="pool-meta">
                  <span className="status">{pool.status}</span>
                  <span>{pool.entries} entries</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}