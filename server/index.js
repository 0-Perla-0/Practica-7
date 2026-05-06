import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg
const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// ── AUTH ──────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, pin } = req.body
  if (!email || !pin) return res.status(400).json({ error: 'Email y PIN requeridos' })
  try {
    const { rows } = await pool.query(
      'SELECT id, nombre, email, es_admin FROM usuarios WHERE email=$1 AND pin=$2',
      [email, String(pin)]
    )
    if (rows.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' })
    res.json(rows[0])
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── MIDDLEWARE ADMIN ──────────────────────────────────
async function requireAdmin(req, res, next) {
  const userId = req.headers['x-user-id']
  if (!userId) return res.status(401).json({ error: 'No autorizado' })
  try {
    const { rows } = await pool.query('SELECT es_admin FROM usuarios WHERE id=$1', [userId])
    if (!rows[0]?.es_admin) return res.status(403).json({ error: 'Solo administradores' })
    next()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// ── STEELBOOKS ────────────────────────────────────────
app.get('/api/steelbooks', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT s.*, p.nombre AS proveedor_nombre
      FROM steelbooks s
      LEFT JOIN proveedores p ON p.id = s.proveedor_id
      ORDER BY s.id
    `)
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/api/steelbooks', requireAdmin, async (req, res) => {
  const { titulo_pelicula, precio_mxn, stock, rareza, proveedor_id } = req.body
  try {
    const { rows } = await pool.query(
      'INSERT INTO steelbooks (titulo_pelicula, precio_mxn, stock, rareza, proveedor_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [titulo_pelicula, precio_mxn, stock || 0, rareza, proveedor_id || null]
    )
    res.json(rows[0])
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.put('/api/steelbooks/:id', requireAdmin, async (req, res) => {
  const { titulo_pelicula, precio_mxn, stock, rareza, proveedor_id } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE steelbooks SET titulo_pelicula=$1, precio_mxn=$2, stock=$3, rareza=$4, proveedor_id=$5 WHERE id=$6 RETURNING *',
      [titulo_pelicula, precio_mxn, stock, rareza, proveedor_id || null, req.params.id]
    )
    res.json(rows[0])
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.delete('/api/steelbooks/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM detalle_orden WHERE steelbook_id=$1', [req.params.id])
    await pool.query('DELETE FROM steelbooks WHERE id=$1', [req.params.id])
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── PROVEEDORES ───────────────────────────────────────
app.get('/api/proveedores', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM proveedores ORDER BY nombre')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(3001, () => console.log('✅ API corriendo en http://localhost:3001'))
