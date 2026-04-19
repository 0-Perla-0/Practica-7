import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Category from './pages/Category'
import ProfileSelect from './pages/ProfileSelect'
import './App.css'

export default function App() {
  const [activeProfile, setActiveProfile] = useState(null)

  if (!activeProfile) {
    return <ProfileSelect onSelect={(profile) => setActiveProfile(profile)} />
  }

  return (
    <div className="app-wrapper">
      <Navbar activeProfile={activeProfile} onGoProfiles={() => setActiveProfile(null)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/perfiles" element={<ProfileSelect onSelect={(profile) => setActiveProfile(profile)} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

// rutas configuradas