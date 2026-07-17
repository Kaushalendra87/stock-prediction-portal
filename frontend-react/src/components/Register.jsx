import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getFriendlyErrorMessage = (errorData) => {
    const normalized = typeof errorData === 'string' ? errorData : JSON.stringify(errorData || {})
    const text = normalized.toLowerCase()

    if (text.includes('username') && (text.includes('already') || text.includes('exists') || text.includes('taken'))) {
      return 'Username already exists. Please choose another one.'
    }

    if (text.includes('email') && (text.includes('already') || text.includes('exists') || text.includes('taken'))) {
      return 'Email already exists. Please choose another one.'
    }

    if (text.includes('password') && text.includes('match')) {
      return 'Passwords do not match.'
    }

    if (text.includes('password') && (text.includes('short') || text.includes('minimum') || text.includes('8'))) {
      return 'Password must be at least 8 characters long.'
    }

    if (text.includes('email') && text.includes('valid')) {
      return 'Please enter a valid email address.'
    }

    return 'Please check your details and try again.'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: '', text: '' })

    if (!formData.userName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a username.' })
      return
    }

    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email.' })
      return
    }

    if (formData.password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' })
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', formData)
      setMessage({ type: 'success', text: 'Registration successful! You can now log in.' })
      setFormData({ userName: '', email: '', password: '', confirmPassword: '' })
      console.log('Registration successful', response.data)
    } catch (error) {
      const errorMessage = error.response
        ? getFriendlyErrorMessage(error.response.data)
        : 'Unable to reach the server. Please try again.'
      setMessage({ type: 'error', text: errorMessage })
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2>Create your account</h2>
          <p>Join the stock prediction portal to track insights and stay informed.</p>
        </div>

        {message.text && (
          <div className={`auth-message ${message.type === 'error' ? 'auth-message--error' : 'auth-message--success'}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>User Name</span>
            <input
              type="text"
              name="userName"
              placeholder="Enter the user name"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register