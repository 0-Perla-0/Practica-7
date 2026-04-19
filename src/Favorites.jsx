import { useFavorites } from '../hooks/useFavorites'
import MovieCard from '../components/MovieCard'
import './Favorites.css'

export default function Favorites() {
  const { favs } = useFavorites()

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">❤️ Mis Favoritas</h2>
      {favs.length === 0 ? (
        <div className="favorites-empty">
          <p>🎀 Aún no tienes películas favoritas</p>
          <p>Dale ❤️ a las películas que más te gusten</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favs.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}