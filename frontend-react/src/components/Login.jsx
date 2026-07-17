import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const navigate = useNavigate()
    const [message, setMessage] = useState({ type: '', text: '' })
    const [isLoading, setIsLoading] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: '', text: '' })

    if (!formData.username.trim() || !formData.password) {
      setMessage({ type: 'error', text: 'Please enter both your username and password.' })
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', {
        username: formData.username,
        password: formData.password,
      })

      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)

      setMessage({ type: 'success', text: 'Login successful! Welcome back.' })
        setFormData({ username: '', password: '' })
        setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Invalid username or password.'
      setMessage({ type: 'error', text: errorMessage })
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2>Welcome back</h2>
          <p>Sign in to continue exploring the stock prediction portal.</p>
        </div>

        {message.text && (
          <div className={`auth-message ${message.type === 'error' ? 'auth-message--error' : 'auth-message--success'}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login