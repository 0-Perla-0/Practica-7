# 🎬 CineMAX — App de Películas en React

> Aplicación web desarrollada con React + Vite que consume la API de TMDB para mostrar información de películas.

## 🚀 Tecnologías Usadas

- **React 18** — Librería UI
- **Vite** — Entorno de desarrollo ultrarrápido
- **React Router v6** — Navegación SPA
- **TMDB API** — Fuente de datos de películas
- **CSS personalizado** — Diseño oscuro cinematográfico

## ✨ Características

- 🏠 **Home** con Hero animado (autoplay entre películas en cartelera)
- 🎬 **Detalle de película** con trailer embebido de YouTube
- 🔍 **Búsqueda** en tiempo real
- 📂 **Categorías**: Populares, Top Rated, Próximas, En Cartelera
- 🎭 **Reparto** y director de cada película
- 📱 **Diseño responsivo** para móvil y desktop

## 🛠️ Instalación y Uso

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/cinemax.git
cd cinemax

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔑 API Key

Este proyecto usa la [API de TMDB](https://www.themoviedb.org/documentation/api).  
La API key está incluida en `src/hooks/useTMDB.js`.  
Para producción, se recomienda usar variables de entorno (`.env`).

## 📁 Estructura del Proyecto

```
src/
├── hooks/
│   └── useTMDB.js        # Hooks para consumir la API
├── components/
│   ├── Navbar.jsx         # Barra de navegación con búsqueda
│   ├── Hero.jsx           # Banner principal con autoplay
│   ├── MovieCard.jsx      # Tarjeta de película
│   ├── MovieGrid.jsx      # Grid de películas
│   ├── Loader.jsx         # Indicador de carga
│   └── Footer.jsx         # Pie de página
├── pages/
│   ├── Home.jsx           # Página principal
│   ├── MovieDetail.jsx    # Detalle + trailer
│   ├── Search.jsx         # Resultados de búsqueda
│   └── Category.jsx       # Por categoría
└── App.jsx                # Rutas con React Router
```

## 🌐 Despliegue

Proyecto desplegado en **Netlify**: [Link del proyecto]

Repositorio en **GitHub**: [Link del repositorio]

## 👥 Equipo

| Nombre | Contribución |
|--------|-------------|
| Nombre Alumno 1 | Setup del proyecto, Hero component |
| Nombre Alumno 2 | MovieCard, MovieGrid, estilos |
| Nombre Alumno 3 | Páginas Detail y Category |
| Nombre Alumno 4 | Search, Footer, despliegue |

**Profesor:** Nombre del Profesor  
**Materia:** Desarrollo Web  
**CUCEI — Universidad de Guadalajara**  
**Calendario:** 2025-A · Abril 2025
