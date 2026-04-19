import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ activeProfile, onGoProfiles }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [q, setQ] = useState('')
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
          <li><Link to="/perfiles">Perfiles</Link></li>
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
        {activeProfile && (
          <img
            src={activeProfile.img}
            alt={activeProfile.name}
            onClick={() => { onGoProfiles() }}
            style={{
              width: '36px',
              height: '36px',
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
  )
}
/* navbar actualizado */
// navbar finalizado