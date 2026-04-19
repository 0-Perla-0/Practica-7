import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PayPalButton from './PayPalButton'
import './Navbar.css'

export default function Navbar({ activeProfile, onGoProfiles }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [q, setQ] = useState('')
  const [showPay, setShowPay] = useState(false)
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

          {activeProfile && (
            <img
              src={activeProfile.img}
              alt={activeProfile.name}
              onClick={() => { onGoProfiles() }}
              style={{
                width: '36px', height: '36px',
                borderRadius: '50%',
                border: `2px solid ${activeProfile.color}`,
                objectFit: 'cover',
                cursor: 'pointer'
              }}
            />
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