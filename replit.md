# Cinemax

Netflix-style movie browsing app en español + tienda virtual de SteelBooks con autenticación real contra PostgreSQL y panel admin CRUD.

## Run & Operate

- `npm run dev` — frontend Vite en puerto 5000
- `node server/index.js` — backend Express en puerto 3001
- `npm run build` — build de producción a `dist/`
- Env vars requeridas: `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

## Stack

- React 19 + Vite 8 (frontend, puerto 5000)
- Express + pg (backend API, puerto 3001)
- React Router DOM 7
- @paypal/react-paypal-js
- PostgreSQL (Replit managed)

## Where things live

- `server/index.js` — Express API (auth, steelbooks CRUD, proveedores)
- `src/context/AuthContext.jsx` — estado de usuario (sessionStorage)
- `src/context/CartContext.jsx` — carrito de compras (client-side)
- `src/pages/Login.jsx` — formulario email + PIN contra PostgreSQL
- `src/pages/TiendaSteelbooks.jsx` — tienda + CRUD admin
- `src/pages/` — Home, Category, MovieDetail, Search, Favorites, FreeMovies
- `src/components/` — Navbar (con carrito 🛒), Footer, Hero, MovieCard, etc.
- `vite.config.js` — proxy `/api` → `http://localhost:3001`

## Architecture decisions

- SPA con autenticación basada en email+PIN validado contra PostgreSQL (sin JWT)
- Estado de sesión guardado en `sessionStorage` (persiste navegación, no recarga)
- Vite proxy para `/api` → Express en puerto 3001 (sin CORS issues en dev)
- Rol admin verificado en backend en cada mutación (header `x-user-id`)
- Carrito simulado client-side con CartContext
- Deployment target: `static` (build `dist/`)

## Product

- Login con email y PIN validado contra tabla `usuarios`
- Perfiles con rol `es_admin` — admins ven CRUD en tienda, usuarios ven carrito
- Movie browsing por categoría y búsqueda (TMDB API)
- Tienda SteelBooks: listado con JOIN proveedor, filtro por nombre
- Admin: Crear / Editar / Eliminar SteelBooks
- Cliente: Añadir al carrito, ver total, quitar items

## DB Tables

`proveedores`, `steelbooks`, `usuarios` (pin, es_admin), `ordenes_compra`, `detalle_orden`

## Admins

- vanessa.saavedra4015@alumnos.udg.mx / PIN: 1234
- perla.cerpa@alumnos.udg.mx / PIN: 4321

## Gotchas

- Vite proxy `/api` requiere que el backend esté corriendo en puerto 3001 antes de hacer requests
- `do` es palabra reservada en PostgreSQL — usar alias `det` para `detalle_orden`
- El workflow "Backend API" debe correr junto al workflow "Start application"

## Pointers

- Deployment: `.local/skills/deployment/SKILL.md`
- Workflows: `.local/skills/workflows/SKILL.md`
- Database: `.local/skills/database/SKILL.md`
