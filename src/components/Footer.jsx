import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">🎬 CINE<em>MAX</em></div>
        <div className="footer-info">
          <p><strong>Integrantes:</strong> Nombre 1, Nombre 2, Nombre 3, Nombre 4</p>
          <p><strong>Profesor:</strong> Nombre del Profesor</p>
          <p><strong>Materia:</strong> Desarrollo Web</p>
          <p><strong>Calendario:</strong> 2026A &nbsp;|&nbsp; Abril 2026</p>
          <p><strong>Institución:</strong> CUCEI – Universidad de Guadalajara</p>
        </div>
      </div>
    </footer>
  )
}