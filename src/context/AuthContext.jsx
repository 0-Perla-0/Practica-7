import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('cinemax_user')) } catch { return null }
  })

  function login(userData) {
    sessionStorage.setItem('cinemax_user', JSON.stringify(userData))
    setUser(userData)
  }

  function logout() {
    sessionStorage.removeItem('cinemax_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
