// src/pages/Register.jsx
import { Link } from 'react-router-dom'
import './styles/Register.css'

export default function Register() {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create your account</h1>
          <p>Join the ultimate football survivor pool – free to play</p>
        </div>

        <form className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              required
              minLength={3}
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn primary large">
            Sign up
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link-accent">
              Log in
            </Link>
          </p>
          <Link to="/" className="back-link">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}