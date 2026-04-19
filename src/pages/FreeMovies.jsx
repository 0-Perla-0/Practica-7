import { useState, useEffect } from 'react'
import { peliculasLibres } from '../data/peliculasLibres'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import './Category.css'

const API_KEY = '00e3ca0b69d5d5ffd0d5eec4c0fbc5c0'
const BASE_URL = 'https://api.themoviedb.org/3'

export default function FreeMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ids = peliculasLibres.map(p => p.id)
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

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">Cine Libre</h1>
        <p className="category-sub">Peliculas que puedes ver completas gratis</p>
      </div>
      {loading ? <Loader /> : (
        <div className="category-grid">
          {movies.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
        </div>
      )}
    </div>
  )
}