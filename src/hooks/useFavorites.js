import { useState } from 'react'

let listeners = []
let favorites = JSON.parse(localStorage.getItem('cinemax-favorites') || '[]')

function setFavorites(newFavs) {
  favorites = newFavs
  localStorage.setItem('cinemax-favorites', JSON.stringify(newFavs))
  listeners.forEach(fn => fn(newFavs))
}

export function useFavorites() {
  const [favs, setFavs] = useState(favorites)

  useState(() => {
    listeners.push(setFavs)
    return () => { listeners = listeners.filter(fn => fn !== setFavs) }
  })

  function toggleFavorite(movie) {
    const exists = favorites.find(f => f.id === movie.id)
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== movie.id))
    } else {
      setFavorites([...favorites, movie])
    }
  }

  function isFavorite(id) {
    return favorites.some(f => f.id === id)
  }

  return { favs, toggleFavorite, isFavorite }
}