import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './TiendaSteelbooks.css'

const RAREZA_COLOR = {
  'Común':       '#6b7280',
  'Poco Común':  '#3b82f6',
  'Raro':        '#8b5cf6',
  'Muy Raro':    '#f59e0b',
  'Épico':       '#e63946',
}

const EMPTY_FORM = { titulo_pelicula: '', precio_mxn: '', stock: 0, rareza: 'Común', proveedor_id: '' }

export default function TiendaSteelbooks() {
  const { user } = useAuth()
  const { items, addItem, removeItem, total, count } = useCart()

  const [steelbooks,   setSteelbooks]   = useState([])
  const [proveedores,  setProveedores]  = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState('')

  const [showForm,     setShowForm]     = useState(false)
  const [editTarget,   setEditTarget]   = useState(null)
  const [form,         setForm]         = useState(EMPTY_FORM)
  const [saving,       setSaving]       = useState(false)
  const [formError,    setFormError]    = useState('')

  const [showCart,     setShowCart]     = useState(false)
  const [deleteId,     setDeleteId]     = useState(null)
  const [search,       setSearch]       = useState('')
  const [feedback,     setFeedback]     = useState('')

  const headers = { 'Content-Type': 'application/json', 'x-user-id': user?.id }

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [sb, pv] = await Promise.all([
        fetch('/api/steelbooks').then(r => r.json()),
        fetch('/api/proveedores').then(r => r.json()),
      ])
      setSteelbooks(Array.isArray(sb) ? sb : [])
      setProveedores(Array.isArray(pv) ? pv : [])
    } catch { setError('Error al cargar los datos') }
    finally { setLoading(false) }
  }

  function openCreate() {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setShowForm(true)
  }

  function openEdit(sb) {
    setEditTarget(sb)
    setForm({
      titulo_pelicula: sb.titulo_pelicula,
      precio_mxn:      sb.precio_mxn,
      stock:           sb.stock,
      rareza:          sb.rareza || 'Común',
      proveedor_id:    sb.proveedor_id || '',
    })
    setFormError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.titulo_pelicula.trim()) { setFormError('El título es obligatorio'); return }
    if (!form.precio_mxn || Number(form.precio_mxn) <= 0) { setFormError('Precio inválido'); return }
    setSaving(true); setFormError('')
    try {
      const url    = editTarget ? `/api/steelbooks/${editTarget.id}` : '/api/steelbooks'
      const method = editTarget ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, headers, body: JSON.stringify(form) })
      const data   = await res.json()
      if (!res.ok) { setFormError(data.error || 'Error al guardar'); return }
      setShowForm(false)
      setFeedback(editTarget ? '✅ SteelBook actualizado' : '✅ SteelBook creado')
      setTimeout(() => setFeedback(''), 3000)
      fetchData()
    } catch { setFormError('Error de red') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await fetch(`/api/steelbooks/${deleteId}`, { method: 'DELETE', headers })
      setDeleteId(null)
      setFeedback('🗑 SteelBook eliminado')
      setTimeout(() => setFeedback(''), 3000)
      fetchData()
    } catch { setFeedback('❌ Error al eliminar') }
  }

  const filtered = steelbooks.filter(sb =>
    sb.titulo_pelicula.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="tienda-loading">
      <div className="tienda-spinner" />
      <p>Cargando SteelBooks...</p>
    </div>
  )
  if (error) return <div className="tienda-error">{error}</div>

  return (
    <div className="tienda-page">

      {/* ── HEADER ── */}
      <div className="tienda-header">
        <div className="tienda-header-left">
          <h1 className="tienda-title">🎬 Tienda <em>SteelBooks</em></h1>
          <p className="tienda-subtitle">
            {user?.es_admin ? '⚙ Panel de administración' : `${steelbooks.length} títulos disponibles`}
          </p>
        </div>
        <div className="tienda-header-right">
          {user?.es_admin && (
            <button className="btn-nuevo" onClick={openCreate}>+ Nuevo SteelBook</button>
          )}
          {!user?.es_admin && (
            <button className="btn-carrito" onClick={() => setShowCart(true)}>
              🛒 Carrito {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          )}
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="tienda-search-wrap">
        <input
          className="tienda-search"
          placeholder="🔍  Buscar título..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── FEEDBACK ── */}
      {feedback && <div className="tienda-feedback">{feedback}</div>}

      {/* ── GRID ── */}
      <div className="steelbooks-grid">
        {filtered.map(sb => (
          <div key={sb.id} className="sb-card">
            <div className="sb-card-top">
              <div className="sb-disc">💿</div>
              <span
                className="sb-rareza"
                style={{ background: RAREZA_COLOR[sb.rareza] || '#6b7280' }}
              >
                {sb.rareza || 'Común'}
              </span>
            </div>
            <h3 className="sb-titulo">{sb.titulo_pelicula}</h3>
            <p className="sb-proveedor">{sb.proveedor_nombre || '—'}</p>
            <div className="sb-meta">
              <span className="sb-precio">${Number(sb.precio_mxn).toLocaleString('es-MX')} MXN</span>
              <span className={`sb-stock ${sb.stock === 0 ? 'agotado' : ''}`}>
                {sb.stock === 0 ? 'Agotado' : `Stock: ${sb.stock}`}
              </span>
            </div>
            <div className="sb-actions">
              {user?.es_admin ? (
                <>
                  <button className="btn-edit" onClick={() => openEdit(sb)}>✏ Editar</button>
                  <button className="btn-del"  onClick={() => setDeleteId(sb.id)}>🗑 Eliminar</button>
                </>
              ) : (
                <button
                  className="btn-add-cart"
                  disabled={sb.stock === 0}
                  onClick={() => {
                    addItem(sb)
                    setFeedback(`🛒 "${sb.titulo_pelicula}" añadido`)
                    setTimeout(() => setFeedback(''), 2500)
                  }}
                >
                  {sb.stock === 0 ? 'Agotado' : '+ Añadir al carrito'}
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="tienda-empty">No se encontraron SteelBooks.</p>
        )}
      </div>

      {/* ── MODAL FORM (CREAR / EDITAR) ── */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editTarget ? 'Editar SteelBook' : 'Nuevo SteelBook'}</h2>

            <div className="modal-field">
              <label>Título de la película</label>
              <input value={form.titulo_pelicula}
                onChange={e => setForm(f => ({ ...f, titulo_pelicula: e.target.value }))}
                placeholder="Ej. Star Wars: Una Nueva Esperanza" />
            </div>
            <div className="modal-row">
              <div className="modal-field">
                <label>Precio (MXN)</label>
                <input type="number" min="0" value={form.precio_mxn}
                  onChange={e => setForm(f => ({ ...f, precio_mxn: e.target.value }))}
                  placeholder="999.00" />
              </div>
              <div className="modal-field">
                <label>Stock</label>
                <input type="number" min="0" value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-field">
                <label>Rareza</label>
                <select value={form.rareza}
                  onChange={e => setForm(f => ({ ...f, rareza: e.target.value }))}>
                  {Object.keys(RAREZA_COLOR).map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label>Proveedor</label>
                <select value={form.proveedor_id}
                  onChange={e => setForm(f => ({ ...f, proveedor_id: e.target.value }))}>
                  <option value="">Sin proveedor</option>
                  {proveedores.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            {formError && <p className="modal-error">{formError}</p>}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn-save" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : editTarget ? 'Guardar cambios' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL CONFIRMAR ELIMINAR ── */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box modal-small" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">¿Eliminar SteelBook?</h2>
            <p className="modal-desc">
              "{steelbooks.find(s => s.id === deleteId)?.titulo_pelicula}" será eliminado permanentemente.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancelar</button>
              <button className="btn-delete-confirm" onClick={handleDelete}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CARRITO DRAWER ── */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>🛒 Mi Carrito</h2>
              <button className="cart-close" onClick={() => setShowCart(false)}>✕</button>
            </div>
            {items.length === 0 ? (
              <p className="cart-empty">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="cart-items">
                  {items.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <p className="cart-item-title">{item.titulo_pelicula}</p>
                        <p className="cart-item-price">
                          ${Number(item.precio_mxn).toLocaleString('es-MX')} × {item.cantidad}
                        </p>
                      </div>
                      <button className="cart-item-del" onClick={() => removeItem(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong>
                </div>
                <button className="btn-checkout">Finalizar compra</button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
