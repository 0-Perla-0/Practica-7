import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useTMDB'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import './Category.css'

const LABELS = {
  popular: { title: '🔥 Populares', sub: 'Las más vistas ahora mismo' },
  top_rated: { title: '⭐ Mejor Valoradas', sub: 'Las mejor puntuadas por la comunidad' },
  upcoming: { title: '🎭 Próximas', sub: 'Estrenos que se vienen' },
  now_playing: { title: '🎬 En Cartelera', sub: 'Disponibles en cines ahora' },
}

export default function Category() {
  const { type } = useParams()
  const { data, loading, error } = useFetch(`/movie/${type}`)
  const info = LABELS[type] || { title: type, sub: '' }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">{info.title}</h1>
        <p className="category-sub">{info.sub}</p>
        <div className="category-tabs">
          {Object.entries(LABELS).map(([key, val]) => (
            <Link key={key} to={`/category/${key}`} className={`tab ${type === key ? 'active' : ''}`}>
              {val.title.split(' ').slice(1).join(' ')}
            </Link>
          ))}
        </div>
      </div>
      {loading ? <Loader /> : error ? (
        <p className="cat-error">Error al cargar</p>
      ) : (
        <div className="category-grid">
          {data?.results?.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
        </div>
      )}
    </div>
  )
}
