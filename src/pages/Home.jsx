import Hero from '../components/Hero'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'
import { useFetch } from '../hooks/useTMDB'
import { peliculasLibres } from '../data/peliculasLibres'
import MovieCardImport from '../components/MovieCard'
import './Home.css'

export default function Home() {
  const { data: popular, loading: l1 } = useFetch('/movie/popular')
  const { data: topRated, loading: l2 } = useFetch('/movie/top_rated')
  const { data: upcoming, loading: l3 } = useFetch('/movie/upcoming')

  return (
    <div className="home">
      <Hero />
      <div className="home-sections">
        <section>
          <h2 className="section-title">🔥 Populares Ahora</h2>
          {l1 ? <Loader /> : <div className="movie-grid">{popular?.results?.slice(0,12).map((m,i) => (
            <MovieCardImport key={m.id} movie={m} index={i} />
          ))}</div>}
        </section>

        <section>
          <h2 className="section-title">⭐ Mejor Valoradas</h2>
          {l2 ? <Loader /> : <div className="movie-grid">{topRated?.results?.slice(0,12).map((m,i) => (
            <MovieCardImport key={m.id} movie={m} index={i} />
          ))}</div>}
        </section>

        <section>
          <h2 className="section-title">🎭 Próximos Estrenos</h2>
          {l3 ? <Loader /> : <div className="movie-grid">{upcoming?.results?.slice(0,12).map((m,i) => (
            <MovieCardImport key={m.id} movie={m} index={i} />
          ))}</div>}
        </section>

        <section>
          <h2 className="section-title">🍿 Cine Libre de Derechos</h2>
          <div className="movie-grid">
            {peliculasLibres.map((peli, i) => (
              <MovieCardImport key={peli.id} movie={peli} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}