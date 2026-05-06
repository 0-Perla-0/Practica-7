import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PayPalButton from './PayPalButton'
import './Navbar.css'

export default function Navbar({ activeUser, onLogout }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [q, setQ] = useState('')
  const [showPay, setShowPay] = useState(false)
  const { count } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  function handleSearch(e) {
    e.preventDefault()
    if (q.trim()) { navigate(`/search?q=${encodeURIComponent(q.trim())}`); setQ('') }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">CINE<em>MAX</em></span>
          </Link>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/category/popular">Populares</Link></li>
            <li><Link to="/category/top_rated">Top Rated</Link></li>
            <li><Link to="/category/upcoming">Próximas</Link></li>
            <li><Link to="/category/free">Cine Libre</Link></li>
            <li><Link to="/favorites">❤️ Favoritas</Link></li>
          </ul>
          <form className="nav-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar película..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          <button onClick={() => setShowPay(true)} style={{
            background: 'linear-gradient(135deg, #f48fb1, #ce93d8)',
            border: 'none', borderRadius: '20px', padding: '7px 16px',
            color: 'white', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'DM Sans',
            boxShadow: '0 4px 15px rgba(244,143,177,0.4)',
            whiteSpace: 'nowrap'
          }}>
            💎 Premium
          </button>

          {/* Carrito */}
          <Link to="/tienda" style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            fontSize: '1.3rem', textDecoration: 'none', padding: '4px'
          }} title="Tienda SteelBooks">
            🛒
            {count > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-6px',
                background: 'var(--accent)', color: 'white',
                borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700,
                padding: '1px 5px', lineHeight: '1.5'
              }}>{count}</span>
            )}
          </Link>

          {/* Avatar + logout */}
          {activeUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div title={activeUser.nombre} style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'var(--accent)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.95rem', position: 'relative',
                flexShrink: 0, border: activeUser.es_admin ? '2px solid gold' : '2px solid var(--accent)'
              }}>
                {activeUser.nombre.charAt(0).toUpperCase()}
                {activeUser.es_admin && (
                  <span style={{
                    position: 'absolute', bottom: '-2px', right: '-2px',
                    width: '10px', height: '10px', background: 'gold',
                    borderRadius: '50%', border: '1.5px solid var(--bg)'
                  }} title="Admin" />
                )}
              </div>
              <button onClick={onLogout} title="Cerrar sesión" style={{
                background: 'none', border: '1px solid var(--border)',
                borderRadius: '8px', color: 'var(--text-muted)',
                padding: '4px 8px', cursor: 'pointer', fontSize: '0.8rem',
                fontFamily: 'DM Sans'
              }}>⏻</button>
            </div>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {showPay && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowPay(false)}>
          <div style={{
            background: 'white', borderRadius: '20px', padding: '2rem',
            width: '360px', boxShadow: '0 20px 60px rgba(244,143,177,0.4)'
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{
              fontFamily: 'Bebas Neue', fontSize: '1.8rem',
              color: '#2d2d2d', marginBottom: '0.5rem', letterSpacing: '2px'
            }}>
              CINEMAX Premium
            </h2>
            <p style={{ color: '#a07090', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Acceso ilimitado a todas las películas 🎬
            </p>
            <PayPalButton amount="99.00" onSuccess={() => setShowPay(false)} />
            <button onClick={() => setShowPay(false)} style={{
              marginTop: '1rem', width: '100%', background: 'none',
              border: '1.5px solid #f8d7da', borderRadius: '10px',
              padding: '0.7rem', color: '#a07090', cursor: 'pointer',
              fontFamily: 'DM Sans', fontSize: '0.9rem'
            }}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  )
}
/* navbar actualizado */
// navbar finalizado