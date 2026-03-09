import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css'

export default function Header({ activeLink = '' }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { supabase } = await import('../lib/supabaseClient');
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="logo clickable" onClick={()=> navigate('/dashboard')}>LastManStanding</h1>
        
        <nav className="header-nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${activeLink === 'pools' ? 'active' : ''}`}
          >
            Pools
          </Link>
          <Link 
            to="/profile" 
            className={`nav-link profile-icon ${activeLink === 'profile' ? 'active' : ''}`}
          >
            Profile
          </Link>
          <button 
            onClick={handleSignOut} 
            className="nav-link signout-btn"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
}