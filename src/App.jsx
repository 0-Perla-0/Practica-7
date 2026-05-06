import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Category from './pages/Category'
import FreeMovies from './pages/FreeMovies'
import Favorites from './pages/Favorites'
import TiendaSteelbooks from './pages/TiendaSteelbooks'
import './App.css'

function AppInner() {
  const { user, logout } = useAuth()
  if (!user) return <Login />
  return (
    <div className="app-wrapper">
      <Navbar activeUser={user} onLogout={logout} />
      <main className="main-content">
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/movie/:id"      element={<MovieDetail />} />
          <Route path="/search"         element={<Search />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/category/free"  element={<FreeMovies />} />
          <Route path="/favorites"      element={<Favorites />} />
          <Route path="/tienda"         element={<TiendaSteelbooks />} />
          <Route path="*"               element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </AuthProvider>
  )
}