import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetch, IMG_BASE } from '../hooks/useTMDB'
import Loader from '../components/Loader'
import MovieCard from '../components/MovieCard'
import './MovieDetail.css'

export default function MovieDetail() {
  const { id } = useParams()
  const { data: movie, loading, error } = useFetch(`/movie/${id}`)
  const { data: credits } = useFetch(`/movie/${id}/credits`)
  const { data: videos } = useFetch(`/movie/${id}/videos`)
  const { data: similar } = useFetch(`/movie/${id}/similar`)
  const [showTrailer, setShowTrailer] = useState(false)

  if (loading) return <Loader text="Cargando película..." />
  if (error || !movie) return (
    <div className="error-page">
      <p>😕 No se pudo cargar la película</p>
      <Link to="/" className="back-btn">← Volver al inicio</Link>
    </div>
  )

  const backdrop = movie.backdrop_path ? `${IMG_BASE}/original${movie.backdrop_path}` : ''
  const poster = movie.poster_path ? `${IMG_BASE}/w500${movie.poster_path}` : ''
  const score = movie.vote_average?.toFixed(1)
  const year = movie.release_date?.slice(0, 4)
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/D'
  const trailer = videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const cast = credits?.cast?.slice(0, 8) || []
  const director = credits?.crew?.find(c => c.job === 'Director')

  return (
    <div className="detail-page">
      {backdrop && (
        <div className="detail-backdrop" style={{ backgroundImage: `url(${backdrop})` }}>
          <div className="detail-backdrop-grad" />
        </div>
      )}

      <div className="detail-container">
        <Link to="/" className="back-link">← Volver</Link>

        <div className="detail-main">
          <div className="detail-poster-wrap">
            {poster ? (
              <img src={poster} alt={movie.title} className="detail-poster" />
            ) : (
              <div className="detail-poster-placeholder">🎬</div>
            )}
            {trailer && (
              <button className="trailer-btn" onClick={() => setShowTrailer(true)}>
                ▶ Ver Tráiler
              </button>
            )}
          </div>

          <div className="detail-info">
            <div className="detail-badges">
              {movie.genres?.map(g => (
                <span key={g.id} className="genre-badge">{g.name}</span>
              ))}
            </div>
            <h1 className="detail-title">{movie.title}</h1>
            {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}

            <div className="detail-stats">
              <div className="stat">
                <span className="stat-label">Calificación</span>
                <span className="stat-val gold">★ {score} <small>/10</small></span>
              </div>
              <div className="stat">
                <span className="stat-label">Año</span>
                <span className="stat-val">{year}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Duración</span>
                <span className="stat-val">{runtime}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Votos</span>
                <span className="stat-val">{movie.vote_count?.toLocaleString()}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Sinopsis</h3>
              <p className="detail-overview">{movie.overview || 'Sin sinopsis disponible.'}</p>
            </div>

            {director && (
              <div className="detail-section">
                <h3>Director</h3>
                <p className="detail-director">{director.name}</p>
              </div>
            )}

            {cast.length > 0 && (
              <div className="detail-section">
                <h3>Reparto Principal</h3>
                <div className="cast-grid">
                  {cast.map(actor => (
                    <div key={actor.id} className="cast-card">
                      <img
                        src={actor.profile_path
                          ? `${IMG_BASE}/w185${actor.profile_path}`
                          : 'https://via.placeholder.com/185x278/0f0f1a/7a7a9a?text=?'}
                        alt={actor.name}
                      />
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-char">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {similar?.results?.length > 0 && (
          <div className="detail-similar">
            <h2 className="section-title">Películas Similares</h2>
            <div className="movie-grid">
              {similar.results.slice(0, 6).map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showTrailer && trailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-box" onClick={e => e.stopPropagation()}>
            <button className="trailer-close" onClick={() => setShowTrailer(false)}>✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </div>
  )
}
