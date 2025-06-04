# Frontend Web - Gestor de Tareas

Una aplicación web moderna construida con Astro y React para gestión de tareas que se conecta a un backend Express.js.

## Características

- **Interfaz Web Moderna** - UI hermosa y responsiva
- **Operaciones CRUD Completas** - Crear, leer, actualizar y eliminar tareas
- **Componentes React Interactivos** - Para funcionalidad dinámica
- **Integración con API** - Se conecta al backend Express.js
- **Filtrado Avanzado** - Filtrar tareas por estado y prioridad
- **Estadísticas de Tareas** - Dashboard con métricas visuales
- **Diseño Responsivo** - Funciona en desktop y móvil
- **Detección de Origen** - Las tareas se marcan como creadas desde Astro

## Tecnologías

- **Astro** - Framework web moderno para sitios rápidos
- **React** - Biblioteca para interfaces de usuario interactivas
- **TypeScript** - JavaScript con tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos modernos para React

## Instalación y Configuración

1. Navega a la carpeta web:

   ```bash
   cd web-notes
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:4321`

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto web-notes:

| Comando       | Acción                                        |
| :------------ | :-------------------------------------------- |
| `npm install` | Instala las dependencias                      |
| `npm run dev` | Inicia servidor dev local en `localhost:4321` |

## 🚀 Estructura del Proyecto

```text
web-notes/
├── public/
│   └── favicon.svg          # Favicon del sitio
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes de UI reutilizables
│   │   ├── TaskManager.tsx # Componente principal de gestión
│   │   ├── TaskForm.tsx    # Formulario de tareas
│   │   ├── TaskCard.tsx    # Tarjeta individual de tarea
│   │   ├── TaskFilters.tsx # Componentes de filtrado
│   │   └── TaskStats.tsx   # Estadísticas y gráficos
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal
│   ├── pages/
│   │   └── index.astro     # Página principal
│   ├── lib/                # Utilidades y configuración
│   │   ├── api.ts          # Cliente API
│   │   └── utils.ts        # Funciones utilitarias
│   ├── types/              # Definiciones TypeScript
│   │   └── task.ts         # Tipos de tareas
│   └── styles/             # Estilos globales
│       └── global.css      # CSS global y Tailwind
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.mjs     # Configuración de Tailwind
├── components.json         # Configuración de componentes UI
└── package.json
```

## Componentes Principales

### TaskManager

El componente principal que maneja:

- Estado global de tareas
- Comunicación con la API
- Coordinación entre componentes hijo

### TaskForm

Formulario para crear y editar tareas con:

- Validación de campos
- Selector de fecha
- Dropdowns para prioridad y estado

### TaskCard

Tarjeta individual que muestra:

- Información completa de la tarea
- Badges de estado y prioridad
- Acciones de editar/eliminar

### TaskFilters

Componente de filtrado con:

- Filtros por estado
- Filtros por prioridad
- Búsqueda por texto

### TaskStats

Dashboard de estadísticas mostrando:

- Total de tareas
- Distribución por estado
- Distribución por prioridad
- Gráficos visuales

## Integración con API

La aplicación se conecta al backend Express.js usando:

### Configuración API (`src/lib/api.ts`)

```typescript
const API_BASE_URL = 'http://localhost:3001/api';

// Funciones para comunicación con la API
- fetchTasks(): Obtener todas las tareas
- createTask(task): Crear nueva tarea
- updateTask(task): Actualizar tarea existente
- deleteTask(id): Eliminar tarea
```

### Headers de Petición

- `Content-Type: application/json`
- Detección automática como origen "astro"

## Tipos de Datos

### Task Interface

```typescript
interface Task {
  task_id: string;
  title: string;
  description: string;
  due_date?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  origin_framework: string;
  user_email: string;
}
```

### API Response Types

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

## Uso de la Aplicación

1. **Crear Tarea**: Usa el formulario principal para agregar nuevas tareas
2. **Ver Tareas**: Todas las tareas se muestran en tarjetas organizadas
3. **Filtrar**: Usa los filtros para mostrar tareas específicas
4. **Editar**: Haz clic en el botón editar de cualquier tarjeta
5. **Eliminar**: Usa el botón eliminar con confirmación
6. **Estadísticas**: Ve el dashboard de métricas en la parte superior

## Características de UX

- **Estados de carga** para operaciones async
- **Mensajes de error** user-friendly
- **Confirmaciones** para acciones destructivas
- **Diseño responsivo** mobile-first
- **Componentes accesibles** con Radix UI

## Requisitos del Sistema

- Node.js 18+
- Backend Express.js ejecutándose en puerto 3001
- Navegador moderno con soporte para ES2022

## 👀 ¿Quieres saber más?

Consulta la [documentación de Astro](https://docs.astro.build) o únete al [servidor de Discord](https://astro.build/chat).
