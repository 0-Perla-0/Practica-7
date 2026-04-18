import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">🎬 CINE<em>MAX</em></div>
        <div className="footer-info">
          <p className="footer-team">
            <strong>Equipo:</strong> Nombre Alumno 1 · Nombre Alumno 2 · Nombre Alumno 3 · Nombre Alumno 4
          </p>
          <p className="footer-details">
            Profesor: Nombre del Profesor &nbsp;|&nbsp; Materia: Desarrollo Web &nbsp;|&nbsp; CUCEI · 2025-A · Abril 2025
          </p>
        </div>
        <div className="footer-cucei">
          <img
            src="https://www.cucei.udg.mx/sites/default/files/escudo-cucei.png"
            alt="Escudo CUCEI"
            className="cucei-shield"
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CineMAX · Datos proporcionados por <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">TMDB</a></p>
      </div>
    </footer>
  )
}
