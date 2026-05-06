import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail]   = useState('')
  const [pin, setPin]       = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !pin.trim()) { setError('Ingresa tu email y PIN'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), pin: pin.trim() })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Credenciales incorrectas'); return }
      login(data)
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icon">🎬</span>
          <h1>CINE<em>MAX</em></h1>
        </div>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="login-field">
            <label>PIN</label>
            <input
              type="password"
              inputMode="numeric"
              placeholder="••••"
              maxLength={10}
              value={pin}
              onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setError('') }}
            />
          </div>

          {error && <p className="login-error">⚠ {error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="login-spinner" /> : 'Entrar'}
          </button>
        </form>

        <p className="login-hint">¿No tienes cuenta? Contacta al administrador.</p>
      </div>
    </div>
  )
}
