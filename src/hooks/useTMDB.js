import { useState, useEffect } from 'react'
 
const API_KEY = '00e3ca0b69d5d5ffd0d5eec4c0fbc5c0'
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p'
 
export function useFetch(endpoint, params = '') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
  useEffect(() => {
    if (!endpoint) return
    setLoading(true)
    setError(null)
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-MX${params}`
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('Error al cargar'); return r.json() })
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [endpoint, params])
 
  return { data, loading, error }
}
 
export function useSearch(query) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    if (!query || query.length < 2) { setResults([]); return }
    setLoading(true)
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`
    fetch(url)
      .then(r => r.json())
      .then(d => { setResults(d.results || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [query])
 
  return { results, loading }
}
 