// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <>
      <header className="hero">
        <nav className="nav">
          <div className="logo">LastMan</div>
        </nav>

        <div className="hero-content">
          <h1>
            One Loss.<br />
            <span>You’re Out.</span>
          </h1>
          <p>
            Create and compete in Last Man Standing pools.
            Pick one winner each week — no repeats.
            Longest survivor wins.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn primary">Login / Register</Link>
            <a href="#how-it-works" className="btn secondary">How It Works</a>
          </div>
        </div>
      </header>

      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Create or Join a Pool</h3>
            <p>Play with friends, coworkers, or enter public pools.</p>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <h3>Pick One Team Weekly</h3>
            <p>No repeats. Every pick matters.</p>
          </div>

          <div className="step">
            <span className="step-number">3</span>
            <h3>Lose Once, You’re Eliminated</h3>
            <p>Survive longer than everyone else to win.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Test Your Survival Instinct?</h2>
        <p>Start your first pool in under a minute.</p>
        <Link to="/register" className="btn primary large">Login / Register</Link>
      </section>
    </>
  )
}

export default Home