import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Header from './Header'; // assuming this is your reusable header
import './styles/PoolDetail.css';

export default function PoolDetail() {
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
        const { data: { user }, error: userErr } = await supabase.auth.getUser();
        if (userErr || !user) throw new Error('Not authenticated');

        // Fetch pool data
        const { data: poolData, error: poolErr } = await supabase
          .from('pools')
          .select('*')
          .eq('id', poolId)
          .single();

        if (poolErr) throw poolErr;
        if (!poolData) throw new Error('Pool not found');

        setPool(poolData);
        setIsOwner(poolData.created_by === user.id);

        // Fetch members
        const { data: membersData, error: membersErr } = await supabase
          .from('profile_pools')
          .select(`
            profile_id,
            joined_at,
            profiles (
              id,
              username,
              full_name
            )
          `)
          .eq('pool_id', poolId)
          .order('joined_at', { ascending: true });

        if (membersErr) throw membersErr;
        setMembers(membersData || []);
      } catch (err) {
        setError(err.message || 'Failed to load pool');
      } finally {
        setLoading(false);
      }
    };

    fetchPool();
  }, [poolId]);

  if (loading) return <div className="loading">Loading pool...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!pool) return <div className="error">Pool not found</div>;

  return (
    <div className="pool-detail-page">
      <Header activeLink="pools" />

      <div className="pool-detail-container">
        <div className="pool-card">
          <h2 className="pool-title">{pool.name}</h2>

          <div className="pool-info-grid">
            <div className="info-item">
              <span className="label">Join Code</span>
              <span className="value code">{pool.join_code}</span>
            </div>
            <div className="info-item">
              <span className="label">Visibility</span>
              <span className="value">{pool.is_public ? 'Public' : 'Private'}</span>
            </div>
            <div className="info-item">
              <span className="label">Ruleset</span>
              <span className="value">{pool.ruleset}</span>
            </div>
            <div className="info-item">
              <span className="label">Created</span>
              <span className="value">{new Date(pool.created_at).toLocaleDateString()}</span>
            </div>
            {isOwner && (
              <div className='info-item'>
              <button
                className="btn primary large"
                onClick={() => navigate(`/manage-pool/${pool.id}`)}
              >
                Manage Pool
              </button>
              </div>
            )}
          </div>

          <div className="members-section">
            <h3>Members ({members.length})</h3>
            <ul className="members-list">
              {members.map((member) => (
                <li key={member.profile_id} className="member-item">
                  <div className="member-name">
                    {member.profiles?.username || 'No username'}
                  </div>
                  {member.profiles?.full_name && (
                    <div className="member-fullname">{member.profiles.full_name}</div>
                  )}
                  {member.profiles?.id === pool.created_by && (
                    <span className="owner-badge">Owner</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="actions">
            <Link to="/dashboard" className="btn secondary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}