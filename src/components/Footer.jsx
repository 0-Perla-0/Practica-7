import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">🎬 CINE<em>MAX</em></div>
        <div className="footer-info">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p><strong>Integrantes:</strong> Perla Esmeralda Cerpa Rodriguez, Vanessa Guadalupe Saavedra Ramirez</p>
              <p><strong>Materia:</strong> Bases de datos</p>
              <p><strong>Calendario:</strong> 2026A &nbsp;|&nbsp; Mayo 2026</p>
            </div>
            <img
              src="/cucei.png"
              alt="CUCEI"
              style={{ width: '60px', height: '60px', objectFit: 'contain', flexShrink: 0 }}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}