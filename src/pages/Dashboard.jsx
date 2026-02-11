// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error('Not logged in');

        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        if (data) setUsername(data.username);
      } catch (err) {
        setError(err?.message || 'Could not load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <div className="dashboard-page">
      <h1>Login successful!</h1>
      {username ? (
        <p>Welcome back, <strong>{username}</strong> 👋</p>
      ) : (
        <p>Welcome! (username not found)</p>
      )}
      {/* Add your more content here */}
    </div>
  );
}