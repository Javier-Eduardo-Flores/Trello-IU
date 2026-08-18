# GP Kanvan

Gestor de proyectos tipo Kanban con drag & drop, CRUD completo para workspaces, listas y tareas.

## Stack

- **Frontend**: React 19 + Vite 7 + Tailwind CSS 4
- **Routing**: React Router 7 (HashRouter para GitHub Pages)
- **Drag & Drop**: @atlaskit/pragmatic-drag-and-drop
- **Iconos**: lucide-react
- **Auth**: JWT + Firebase (backend)
- **Backend API**: FastAPI — https://api-trello-v7re.onrender.com

## Estructura del proyecto

```
src/
├── Components/
│   ├── Dashboard.jsx          # Vista principal de workspaces
│   ├── KanbanBoard.jsx        # Tablero Kanban con drag & drop
│   ├── KanbanColumn.jsx       # Columna del tablero (drop target)
│   ├── KanbanCard.jsx         # Tarjeta de tarea (draggable)
│   ├── Workspace.jsx          # Card de workspace
│   ├── TaskModal.jsx          # Modal crear/editar tarea
│   ├── ListModal.jsx          # Modal crear/editar lista
│   ├── CreateWorkspaceModal.jsx
│   ├── EditWorkspaceModal.jsx
│   ├── ConfirmModal.jsx       # Modal de confirmación con manejo de errores
│   ├── LoginScreen.jsx
│   ├── SignUpScreen.jsx
│   ├── ProtectedRoute.jsx     # Ruta protegida (requiere auth)
│   └── PublicRoute.jsx        # Ruta pública (redirige si ya autenticado)
├── context/
│   └── AuthContext.jsx        # Estado de autenticación global
├── services/
│   ├── api.js                 # URL base, manejo de respuestas, normalización _id→id
│   ├── authService.js         # Login, register, logout, JWT decode
│   ├── workspaceService.js    # CRUD workspaces
│   ├── listService.js         # CRUD listas (title↔name mapping)
│   └── taskService.js         # CRUD tareas + move entre listas
└── assets/
    └── icons/                 # Iconos PNG para workspace cards
```

## Funcionalidades

- **Auth**: Registro, inicio de sesión, cierre de sesión con JWT
- **Workspaces**: Crear, editar, eliminar (con confirmación si tiene listas)
- **Listas**: Crear, editar, eliminar, descripción, orden cronológico
- **Tareas**: Crear, editar, eliminar, descripción, mover entre listas
- **Drag & Drop**: Mover tareas entre columnas con actualización optimista
- **Modales**: Escape para cerrar, reset de formulario al cerrar
- **Manejo de errores**: Mensajes de error en modales de eliminación, fallback en carga de datos

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Lint
npm run lint

# Preview del build
npm run preview
```

## Despliegue

La app se despliega automáticamente a **GitHub Pages** vía GitHub Actions al hacer push a `main`.

- URL: `https://javier-eduardo-flores.github.io/Trello-IU/`
- Workflow: `.github/workflows/deploy.yml`
- Build output: `dist/` (desplegado por `peaceiris/actions-gh-pages`)
