// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import '../styles/landing.css'  // We'll create this next

function Home() {
  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="logo">Last Man Standing</h1>
          <nav className="nav">
            <Link to="/login">Log In</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h2>Be the Last One Standing</h2>
          <p>The ultimate football survivor pool – pick one winning team each week, no repeats, last player alive wins the pot!</p>
          <Link to="/register" className="btn-large">Join Now & Play</Link>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <h2 className="section-title">What is Last Man Standing?</h2>
          <div className="grid">
            <div className="card">
              <h3>1. Pick One Team Per Week</h3>
              <p>Each game week, choose one team you think will win their match (straight win, no spreads).</p>
            </div>
            <div className="card">
              <h3>2. No Repeats Allowed</h3>
              <p>You can only pick each team once during the entire competition – strategy matters!</p>
            </div>
            <div className="card">
              <h3>3. Survive or Be Eliminated</h3>
              <p>If your team wins, you advance. If they lose or draw, you're out. Last player standing wins!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-bg" id="features">
        <div className="container">
          <h2 className="section-title">Why Play With Us?</h2>
          <ul className="features-list">
            <li>Easy weekly picks with live fixtures</li>
            <li>Real-time leaderboards & elimination tracking</li>
            <li>Private pools for friends or public competitions</li>
            <li>Automatic result updates from official sources</li>
            <li>Secure user accounts and pick history</li>
            <li>Mobile-friendly – pick anytime, anywhere</li>
          </ul>
          <div className="cta-center">
            <Link to="/register" className="btn-large">Create Your Free Account</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Last Man Standing Football. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Home