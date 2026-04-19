import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useTMDB'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import './Search.css'

export default function Search() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const { results, loading } = useSearch(q)

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Resultados para: <em>"{q}"</em></h1>
        {!loading && <p className="results-count">{results.length} películas encontradas</p>}
      </div>
      {loading ? (
        <Loader text="Buscando..." />
      ) : results.length === 0 ? (
        <div className="no-results">
          <span>😕</span>
          <p>No se encontraron resultados para "{q}"</p>
        </div>
      ) : (
        <div className="search-grid">
          {results.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
        </div>
      )}
    </div>
  )
}

// busqueda en tiempo real