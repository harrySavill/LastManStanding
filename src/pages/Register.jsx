// src/pages/Register.jsx
import { Link, useNavigate } from 'react-router-dom'
import './styles/Register.css'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Register() {
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [username, setUsername]       = useState('')
  const [loading, setLoading]         = useState(false)
  const [errorMsg, setErrorMsg]       = useState(null)

  const navigate = useNavigate()

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    if (password !== confirmedPassword) {
      setErrorMsg("Passwords don't match")
      setLoading(false)
      return
    }

    if (username.length < 3) {
      setErrorMsg("Username must be at least 3 characters")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }           // ← sent to raw_user_meta_data
      }
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    navigate('/login')
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create your account</h1>
          <p>Join the ultimate football survivor pool – free to play</p>
        </div>

        <form className="register-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value.trim())}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              value={confirmedPassword}
              onChange={e => setConfirmedPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn primary large" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          {errorMsg && <p style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</p>}
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link-accent">Log in</Link>
          </p>
          <Link to="/" className="back-link">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}