import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetch, IMG_BASE } from '../hooks/useTMDB'
import './Hero.css'

export default function Hero() {
  const { data } = useFetch('/movie/now_playing')
  const [current, setCurrent] = useState(0)
  const movies = data?.results?.slice(0, 6) || []

  useEffect(() => {
    if (!movies.length) return
    const t = setInterval(() => setCurrent(c => (c + 1) % movies.length), 6000)
    return () => clearInterval(t)
  }, [movies.length])

  if (!movies.length) return null
  const m = movies[current]
  const bg = m.backdrop_path ? `${IMG_BASE}/original${m.backdrop_path}` : ''
  const score = m.vote_average?.toFixed(1)
  const year = m.release_date?.slice(0, 4)

  return (
    <div className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${bg})` }} key={m.id} />
      <div className="hero-grad" />
      <div className="hero-content">
        <div className="hero-badge">🔥 En Cartelera</div>
        <h1 className="hero-title">{m.title}</h1>
        <div className="hero-meta">
          <span className="hero-score">★ {score}</span>
          <span className="hero-year">{year}</span>
        </div>
        <p className="hero-overview">{m.overview?.slice(0, 200)}{m.overview?.length > 200 ? '...' : ''}</p>
        <div className="hero-actions">
          <Link to={`/movie/${m.id}`} className="hero-btn-primary">
            ▶ Ver Película
          </Link>
          <Link to={`/movie/${m.id}`} className="hero-btn-secondary">
            + Más info
          </Link>
        </div>
      </div>
      <div className="hero-dots">
        {movies.map((_, i) => (
          <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  )
}
