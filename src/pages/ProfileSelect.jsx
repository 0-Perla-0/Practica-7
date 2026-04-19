import { useState } from 'react'
import './ProfileSelect.css'

const CATEGORIES = [
  {
    name: 'Looney Tunes', color: '#f4a022',
    characters: [
      { id: 1,  name: 'Bugs Bunny',  img: '/avatars/bugs-bunny.png' },
      { id: 2,  name: 'Tweety',      img: '/avatars/tweety.png' },
      { id: 3,  name: 'Silvestre',   img: '/avatars/silvestre.png' },
      { id: 4,  name: 'Porky Pig',   img: '/avatars/porky.png' },
      { id: 5,  name: 'Pato Lucas',  img: '/avatars/pato-lucas.png' },
    ]
  },
  {
    name: 'Hello Kitty / Sanrio', color: '#ff6b9d',
    characters: [
      { id: 6,  name: 'Hello Kitty', img: '/avatars/hello-kitty.png' },
      { id: 7,  name: 'My Melody',   img: '/avatars/my-melody.png' },
      { id: 8,  name: 'Cinnamoroll', img: '/avatars/cinnamoroll.png' },
      { id: 9,  name: 'Kuromi',      img: '/avatars/kuromi.png' },
      { id: 10, name: 'Pompompurin', img: '/avatars/pompompurin.png' },
    ]
  },
  {
    name: 'Barbie', color: '#ff1493',
    characters: [
      { id: 11, name: 'Barbie',  img: '/avatars/barbie.png' },
      { id: 12, name: 'Ken',     img: '/avatars/ken.png' },
      { id: 13, name: 'Skipper', img: '/avatars/skipper.png' },
      { id: 14, name: 'Teresa',  img: '/avatars/teresa.png' },
    ]
  },
  {
    name: 'Bratz', color: '#a855f7',
    characters: [
      { id: 15, name: 'Cloe',   img: '/avatars/cloe.png' },
      { id: 16, name: 'Jade',   img: '/avatars/jade.png' },
      { id: 17, name: 'Sasha',  img: '/avatars/sasha.png' },
      { id: 18, name: 'Yasmin', img: '/avatars/yasmin.png' },
    ]
  },
  {
    name: 'Monster High', color: '#10b981',
    characters: [
      { id: 19, name: 'Frankie Stein',  img: '/avatars/frankie.png' },
      { id: 20, name: 'Draculaura',     img: '/avatars/draculaura.png' },
      { id: 21, name: 'Clawdeen Wolf',  img: '/avatars/clawdeen.png' },
      { id: 22, name: 'Cleo de Nile',   img: '/avatars/cleo.png' },
    ]
  },
  {
    name: 'Rosita Fresita', color: '#ff4d6d',
    characters: [
      { id: 23, name: 'Rosita Fresita', img: '/avatars/rosita.png' },
      { id: 24, name: 'Naranja',        img: '/avatars/naranja.png' },
      { id: 25, name: 'Limon',          img: '/avatars/limon.png' },
    ]
  },
  {
    name: 'Max Steel', color: '#3b82f6',
    characters: [
      { id: 26, name: 'Max Steel',  img: '/avatars/max-steel.png' },
      { id: 27, name: 'Steel',      img: '/avatars/steel.png' },
      { id: 28, name: 'Elementor',  img: '/avatars/elementor.png' },
    ]
  },
  {
    name: 'Disney', color: '#f59e0b',
    characters: [
      { id: 29, name: 'Minnie Mouse', img: '/avatars/minnie.png' },
      { id: 30, name: 'Daisy Duck',   img: '/avatars/daisy.png' },
      { id: 31, name: 'Stitch',       img: '/avatars/stitch.png' },
      { id: 32, name: 'Simba',        img: '/avatars/simba.png' },
    ]
  },
]

const INITIAL_PROFILES = [
  { id: 1, name: 'Perla',  img: '/avatars/hello-kitty.png', color: '#ff6b9d' },
  { id: 2, name: 'Marcos', img: '/avatars/max-steel.png',   color: '#3b82f6' },
  { id: 3, name: 'Vane',   img: '/avatars/kuromi.png',      color: '#a855f7' },
]

export default function ProfileSelect({ onSelect }) {
  const [profiles, setProfiles] = useState(INITIAL_PROFILES)
  const [mode, setMode] = useState('list') // list | create | edit
  const [step, setStep] = useState('category')
  const [selectedCat, setSelectedCat] = useState(null)
  const [selectedChar, setSelectedChar] = useState(null)
  const [profileName, setProfileName] = useState('')
  const [editingProfile, setEditingProfile] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  function handleProfileClick(p) {
  if (mode !== 'list') return
  setChosen(p.id)
  setTimeout(() => { if (onSelect) onSelect(p) }, 800)
}

  function startEdit(e, p) {
    e.stopPropagation()
    setEditingProfile(p)
    setProfileName(p.name)
    setSelectedChar({ img: p.img })
    setSelectedCat(null)
    setStep('category')
    setMode('edit')
  }

  function startCreate() {
    setEditingProfile(null)
    setProfileName('')
    setSelectedChar(null)
    setSelectedCat(null)
    setStep('category')
    setMode('create')
  }

  function handleFinish() {
    if (!profileName.trim()) return
    if (mode === 'create' && selectedChar) {
      setProfiles(prev => [...prev, {
        id: Date.now(),
        name: profileName,
        img: selectedChar.img,
        color: selectedCat?.color || '#e63946'
      }])
    } else if (mode === 'edit' && editingProfile) {
      setProfiles(prev => prev.map(p =>
        p.id === editingProfile.id
          ? { ...p, name: profileName, img: selectedChar?.img || p.img, color: selectedCat?.color || p.color }
          : p
      ))
    }
    setMode('list')
  }

  function handleDelete(id) {
    setProfiles(prev => prev.filter(p => p.id !== id))
    setConfirmDelete(null)
    setMode('list')
  }

  if (mode === 'list') return (
    <div className="profile-page">
      <div className="profile-bg" />
      <div className="profile-container">
        <h1 className="profile-title">QUIEN ERES?</h1>
        <div className="profiles-grid">
          {profiles.map(p => (
            <div key={p.id} className={`profile-card ${chosen === p.id ? 'chosen' : ''}`}>
              <div className="profile-avatar" style={{ borderColor: p.color }} onClick={() => handleProfileClick(p)}>
                <img src={p.img} alt={p.name} onError={e => { e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + p.name }} />
              </div>
              <p className="profile-name" onClick={() => handleProfileClick(p)}>{p.name}</p>
              <button className="edit-btn" onClick={e => startEdit(e, p)}>✏️ Editar</button>
            </div>
          ))}
          <div className="profile-card" onClick={startCreate}>
            <div className="profile-avatar new-avatar"><span>+</span></div>
            <p className="profile-name">Nuevo</p>
          </div>
        </div>
        <p className="profile-hint">Toca tu perfil para continuar · Toca Editar para modificar</p>
      </div>

      {confirmDelete && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>Eliminar perfil <strong>{profiles.find(p => p.id === confirmDelete)?.name}</strong>?</p>
            <div className="confirm-actions">
              <button className="btn-cancel-del" onClick={() => setConfirmDelete(null)}>Cancelar</button>
              <button className="btn-delete" onClick={() => handleDelete(confirmDelete)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="profile-page">
      <div className="profile-bg" />
      <div className="creator-container">

        {mode === 'edit' && step === 'category' && (
          <div className="edit-header">
            <div className="edit-preview">
              <img src={editingProfile.img} alt={editingProfile.name} />
            </div>
            <input
              className="profile-input"
              type="text"
              placeholder="Nombre del perfil"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              maxLength={12}
            />
            <div className="edit-actions-top">
              <button className="btn-change-avatar" onClick={() => setStep('character-edit')}>
                Cambiar avatar
              </button>
              <button className="btn-delete-profile" onClick={() => setConfirmDelete(editingProfile.id)}>
                Eliminar perfil
              </button>
            </div>
            <div className="form-actions" style={{ maxWidth: 300, margin: '0 auto' }}>
              <button className="btn-back" onClick={() => setMode('list')}>Cancelar</button>
              <button className="btn-create" style={{ background: editingProfile.color }} onClick={handleFinish} disabled={!profileName.trim()}>
                Guardar
              </button>
            </div>
          </div>
        )}

        {(step === 'category' && mode === 'create') && (
          <>
            <h2 className="creator-title">ELIGE UNA CATEGORIA</h2>
            <div className="categories-grid">
              {CATEGORIES.map(cat => (
                <button key={cat.name} className="cat-btn" style={{ '--cat-color': cat.color }}
                  onClick={() => { setSelectedCat(cat); setStep('character') }}>
                  {cat.name}
                </button>
              ))}
            </div>
            <button className="btn-back" onClick={() => setMode('list')}>Cancelar</button>
          </>
        )}

        {(step === 'character' || step === 'character-edit') && selectedCat && (
          <>
            <h2 className="creator-title">{selectedCat.name.toUpperCase()}</h2>
            <div className="chars-grid">
              {selectedCat.characters.map(c => (
                <div key={c.id} className={`char-card ${selectedChar?.img === c.img ? 'selected' : ''}`}
                  style={{ '--cat-color': selectedCat.color }}
                  onClick={() => {
                    setSelectedChar(c)
                    setStep(step === 'character-edit' ? 'category' : 'name')
                  }}>
                  <img src={c.img} alt={c.name} onError={e => { e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + c.name }} />
                  <p>{c.name}</p>
                </div>
              ))}
            </div>
            <button className="btn-back" onClick={() => setStep(mode === 'edit' ? 'category' : 'category')}>← Atras</button>
          </>
        )}

        {step === 'character-edit' && !selectedCat && (
          <>
            <h2 className="creator-title">ELIGE UNA CATEGORIA</h2>
            <div className="categories-grid">
              {CATEGORIES.map(cat => (
                <button key={cat.name} className="cat-btn" style={{ '--cat-color': cat.color }}
                  onClick={() => { setSelectedCat(cat); setStep('character-edit') }}>
                  {cat.name}
                </button>
              ))}
            </div>
            <button className="btn-back" onClick={() => setStep('category')}>← Atras</button>
          </>
        )}

        {step === 'name' && selectedChar && (
          <>
            <h2 className="creator-title">DALE UN NOMBRE</h2>
            <div className="name-step">
              <div className="char-preview" style={{ borderColor: selectedCat?.color }}>
                <img src={selectedChar.img} alt="" onError={e => { e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=default' }} />
              </div>
              <input className="profile-input" type="text" placeholder="Tu nombre..."
                value={profileName} onChange={e => setProfileName(e.target.value)}
                maxLength={12} autoFocus />
              <div className="form-actions">
                <button className="btn-back" onClick={() => setStep('character')}>← Atras</button>
                <button className="btn-create" style={{ background: selectedCat?.color }}
                  onClick={handleFinish} disabled={!profileName.trim()}>
                  Crear perfil
                </button>
              </div>
            </div>
          </>
        )}

      </div>

      {confirmDelete && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>Eliminar perfil <strong>{profiles.find(p => p.id === confirmDelete)?.name}</strong>?</p>
            <div className="confirm-actions">
              <button className="btn-cancel-del" onClick={() => setConfirmDelete(null)}>Cancelar</button>
              <button className="btn-delete" onClick={() => handleDelete(confirmDelete)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}