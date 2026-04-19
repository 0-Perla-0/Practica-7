import { Link } from 'react-router-dom'
import { IMG_BASE } from '../hooks/useTMDB'
import { useFavorites } from '../hooks/useFavorites'
import './MovieCard.css'

export default function MovieCard({ movie, index = 0 }) {
  const { id, title, poster_path, vote_average, release_date } = movie
  const year = release_date ? release_date.slice(0, 4) : 'N/D'
  const score = vote_average ? vote_average.toFixed(1) : '?'
  const scoreColor = vote_average >= 7.5 ? '#4caf50' : vote_average >= 6 ? '#f4d03f' : '#e63946'
  const poster = poster_path
    ? `${IMG_BASE}/w500${poster_path}`
    : 'https://via.placeholder.com/500x750/fde8ef/f48fb1?text=Sin+Imagen'

  const { toggleFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(id)

  return (
    <div className="movie-card-wrap" style={{ animationDelay: `${index * 0.05}s` }}>
      <Link to={`/movie/${id}`} className="movie-card">
        <div className="card-poster-wrap">
          <img src={poster} alt={title} loading="lazy" />
          <div className="card-overlay">
            <span className="card-play">▶ Ver detalles</span>
          </div>
          <div className="card-score" style={{ '--sc': scoreColor }}>
            ★ {score}
          </div>
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <span className="card-year">{year}</span>
        </div>
      </Link>
      <button
        className={`fav-btn ${fav ? 'active' : ''}`}
        onClick={() => toggleFavorite(movie)}
        title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {fav ? '❤️' : '🤍'}
      </button>
    </div>
  )
}