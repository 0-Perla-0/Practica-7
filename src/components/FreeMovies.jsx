import { peliculasLibres } from '../data/peliculasLibres';
import './FreeMovies.css'; 

export default function FreeMovies() {
  return (
    <section className="home-sections">
      <h2 className="section-title">📺 Películas de Dominio Público</h2>
      <div className="movie-grid">
        {peliculasLibres.map((peli) => (
          <div key={peli.id} className="free-movie-card" style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src={`https://www.youtube.com/embed/${peli.youtubeId}`}
                title={peli.titulo}
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{peli.titulo}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{peli.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}