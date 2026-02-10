// src/pages/Login.jsx
import { Link } from 'react-router-dom'
import './Login.css'  

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome back</h1>
        </div>

        <form className="login-form">
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
            />
          </div>

          <button type="submit" className="btn primary large">
            Log in
          </button>

          <div className="forgot-password">
            <Link to="/forgot-password" className="link-accent">
              Forgot password?
            </Link>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link-accent">
              Sign up
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