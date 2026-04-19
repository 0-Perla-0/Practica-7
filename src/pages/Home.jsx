import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Loader from '../components/Loader'
import { useFetch } from '../hooks/useTMDB'
import { peliculasLibres } from '../data/peliculasLibres'
import MovieCard from '../components/MovieCard'
import './Home.css'

const API_KEY = '00e3ca0b69d5d5ffd0d5eec4c0fbc5c0'
const BASE_URL = 'https://api.themoviedb.org/3'

function useMoviesById(ids) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ids || ids.length === 0) return
    setLoading(true)
    Promise.all(
      ids.map(id =>
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`)
          .then(r => r.json())
          .catch(() => null)
      )
    ).then(results => {
      setMovies(results.filter(Boolean))
      setLoading(false)
    })
  }, [])

  return { movies, loading }
}

export default function Home() {
  const { data: popular, loading: l1 } = useFetch('/movie/popular')
  const { data: topRated, loading: l2 } = useFetch('/movie/top_rated')
  const { data: upcoming, loading: l3 } = useFetch('/movie/upcoming')

  const freeIds = peliculasLibres.map(p => p.id)
  const { movies: freeMovies, loading: l4 } = useMoviesById(freeIds)

  return (
    <div className="home">
      <Hero />
      <div className="home-sections">
        <section>
          <h2 className="section-title">🔥 Populares Ahora</h2>
          {l1 ? <Loader /> : (
            <div className="movie-grid">
              {popular?.results?.slice(0, 12).map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="section-title">⭐ Mejor Valoradas</h2>
          {l2 ? <Loader /> : (
            <div className="movie-grid">
              {topRated?.results?.slice(0, 12).map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="section-title">🎭 Próximos Estrenos</h2>
          {l3 ? <Loader /> : (
            <div className="movie-grid">
              {upcoming?.results?.slice(0, 12).map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="section-title">🍿 Cine Libre — Ver Completas</h2>
          {l4 ? <Loader /> : (
            <div className="movie-grid">
              {freeMovies.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
// integracion TMDB