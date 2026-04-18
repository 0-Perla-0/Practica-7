import MovieCard from './MovieCard'
import './MovieGrid.css'

export default function MovieGrid({ movies, title }) {
  return (
    <section className="movie-grid-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="movie-grid">
        {movies.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
      </div>
    </section>
  )
}
