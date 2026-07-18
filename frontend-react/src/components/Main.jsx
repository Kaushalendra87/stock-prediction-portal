import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="container py-4">
      <section className="hero-card">
        <div className="hero-card__content">
          <p className="hero-card__eyebrow">AI-powered market insights</p>
          <h1>Forecast stock trends with confidence.</h1>
          <p className="hero-card__text">
            Explore a modern stock prediction portal built with Django and React.
            Analyze momentum signals, review market forecasts, and make smarter investment decisions.
          </p>

          {!isLoggedIn && (
            <div className="hero-card__actions">
              <Link className="btn btn-info px-4 py-2" to="/register">
                Create account
              </Link>
              <Link className="btn btn-outline-info px-4 py-2" to="/login">
                Sign in
              </Link>
            </div>
          )}
        </div>

        <div className="hero-card__panel">
          <div className="hero-card__panel-box">
            <h3>Why this platform?</h3>
            <ul>
              <li>ML-based forecasting workflow</li>
              <li>Clean, responsive dashboard experience</li>
              <li>Secure authentication and user accounts</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Predictive modeling</h3>
          <p>Leverage historical market patterns to estimate future price direction.</p>
        </div>
        <div className="feature-card">
          <h3>Actionable signals</h3>
          <p>Understand trend indicators and translate them into informed decisions.</p>
        </div>
        <div className="feature-card">
          <h3>Simple experience</h3>
          <p>Enjoy a smooth, modern interface that keeps the focus on the data.</p>
        </div>
      </section>
    </div>
  )
}

export default Main