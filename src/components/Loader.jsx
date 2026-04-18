import './Loader.css'
export default function Loader({ text = 'Cargando...' }) {
  return (
    <div className="loader-wrap">
      <div className="loader-ring" />
      <p className="loader-text">{text}</p>
    </div>
  )
}
