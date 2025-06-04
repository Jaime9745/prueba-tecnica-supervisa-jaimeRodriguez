# Gestor de Tareas - Aplicación Completa

Un sistema integral de gestión de tareas con múltiples interfaces frontend y un backend unificado en Express.js.

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

### Obligatorios

- **Node.js** (versión 18 o superior)
  - Descargar desde: https://nodejs.org/
  - Verificar instalación: `node --version`

### Opcionales (para aplicación móvil)

- **Flutter SDK**
  - Descargar desde: https://docs.flutter.dev/get-started/install
  - Verificar instalación: `flutter doctor`
  - **Emulador Android/iOS** o dispositivo físico conectado

> 💡 **Nota**: Si no tienes Flutter instalado, puedes usar solo el backend y frontend web con `npm run dev:backend` y `npm run dev:web`

## Estructura del Proyecto

Este proyecto está compuesto por tres componentes principales:

1. **Backend (Express.js)** - Servidor API RESTful
2. **Frontend Web (Astro)** - Interfaz web para gestión de tareas
3. **Aplicación Móvil (Flutter)** - Aplicación móvil multiplataforma

## Características

- **Operaciones CRUD Completas** - Crear, leer, actualizar y eliminar tareas
- **Soporte Multiplataforma** - Interfaces web y móvil
- **Detección de Framework de Origen** - Rastrea qué plataforma creó cada tarea
- **Backend Unificado** - Una sola API Express.js sirve a ambos frontends
- **UI Moderna** - Interfaces hermosas y responsivas
- **Actualizaciones en Tiempo Real** - Los cambios se reflejan en todas las plataformas
- **Interfaz en Español** - Aplicación móvil completamente traducida al español

## 🚀 Instrucciones para Ejecutar el Proyecto

### Método Rápido (Recomendado)

**Un solo comando para iniciar todo el entorno de desarrollo:**

```bash
# En la raíz del proyecto
npm install
npm run dev
```

Este comando automáticamente:

- ✅ Instala las dependencias de Flutter (flutter pub get)
- ✅ Instala las dependencias del backend
- ✅ Inicia el servidor Express.js en puerto 3001
- ✅ Instala las dependencias del frontend web
- ✅ Inicia el servidor Astro en puerto 4321
- ✅ Backend y frontend web se ejecutan en paralelo

### Para la Aplicación Móvil (Flutter)

Las dependencias ya están instaladas, solo ejecuta:

```bash
cd app_notes
flutter run
```

### Método Manual (Alternativo)

Si prefieres iniciar cada componente por separado:

1. **Backend (Express.js)**:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Web (Astro)**:

   ```bash
   cd web-notes
   npm install
   npm run dev
   ```

3. **Aplicación Móvil (Flutter)**:
   ```bash
   cd app_notes
   flutter pub get
   flutter run
   ```

### Scripts de Desarrollo Disponibles

| Comando                  | Descripción                                   |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | **Inicia backend + frontend web en paralelo** |
| `npm run dev:backend`    | Solo el servidor Express.js                   |
| `npm run dev:web`        | Solo el frontend Astro                        |
| `npm run install:all`    | Instala todas las dependencias                |
| `npm run install:mobile` | Instala dependencias de Flutter               |
| `npm run build`          | Construye para producción                     |
| `npm run start`          | Ejecuta en modo producción                    |

### Puertos de Desarrollo

- **Backend API**: http://localhost:3001
- **Frontend Web**: http://localhost:4321
- **App Móvil**: Emulador/dispositivo Flutter

### Verificación de Instalación

Antes de ejecutar `npm run dev`, verifica que tienes todo instalado:

```bash
# Verificar Node.js
node --version

# Verificar Flutter (opcional)
flutter doctor
```

## Estructura de Tareas

Cada tarea incluye los siguientes campos:

- `task_id`: Identificador único
- `title`: Título de la tarea
- `description`: Descripción de la tarea
- `due_date`: Fecha límite opcional
- `priority`: baja, media, alta
- `status`: pendiente, en_progreso, completada
- `origin_framework`: astro o flutter
- `user_email`: Identificador del usuario

## Endpoints de la API

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea existente
- `DELETE /api/tasks/:id` - Eliminar una tarea
- `GET /health` - Endpoint de verificación de salud

## 🎯 Funcionalidades Implementadas

### Gestión Completa de Tareas

- ✅ **Crear tareas** con título, descripción, prioridad y fecha límite opcional
- ✅ **Editar tareas** existentes desde cualquier plataforma
- ✅ **Eliminar tareas** con confirmación
- ✅ **Filtrar tareas** por estado y prioridad
- ✅ **Validación de formularios** en tiempo real

### Multiplataforma Sincronizada

- ✅ **API unificada** - Un solo backend sirve a todas las plataformas
- ✅ **Detección automática** - Rastrea el origen de cada tarea (web/móvil)
- ✅ **Sincronización automática** - Los cambios se reflejan en todas las interfaces
- ✅ **Botón de actualización** - Refresh manual en la app móvil

### Características Técnicas Avanzadas

- ✅ **TypeScript en todo el stack** - Tipado estático completo
- ✅ **Validación robusta** - Middleware personalizado de validación
- ✅ **Manejo de errores** - Sistema centralizado de errores
- ✅ **Seguridad** - Rate limiting, CORS, Helmet
- ✅ **Localización** - Interfaz móvil completamente en español

## 🧪 Demostración de Uso

### 1. Iniciar Backend + Frontend Web

```bash
git clone <repository-url>
cd gestor-tareas-completo
npm install
npm run dev
```

Este comando iniciará automáticamente:

- 🔄 Instalación de dependencias Flutter
- 🚀 Backend Express.js en puerto 3001
- 🌐 Frontend Astro en puerto 4321

### 2. Iniciar Aplicación Móvil

En una nueva terminal (las dependencias ya están instaladas):

```bash
cd app_notes
flutter run
```

Esto iniciará:

- 📱 Aplicación Flutter en tu emulador/dispositivo

### 3. Probar la API

```bash
# Obtener todas las tareas
curl http://localhost:3001/api/tasks

# Crear una nueva tarea
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi tarea","description":"Descripción","priority":"alta","status":"pendiente"}'
```

### 4. Usar las Interfaces

- **Web**: Abrir http://localhost:4321 en tu navegador
- **Móvil**: Ejecutar `flutter run` desde la carpeta `app_notes/` (dependencias ya instaladas)
- **API REST**: Disponible en http://localhost:3001/api/tasks

## 📊 Estado del Proyecto

**Backend**: ✅ Completamente funcional

- Express.js con TypeScript
- API RESTful con validación
- Almacenamiento en JSON
- Middleware de seguridad

**Frontend Web**: ✅ Completamente funcional

- Interfaz Astro + React
- Integración completa con API
- Diseño responsivo

**App Móvil**: ✅ Completamente funcional

- Flutter con Material Design
- Interfaz en español
- HTTP client integrado
- Validación de formularios

## 🏗️ Arquitectura y Frameworks Utilizados

### Backend - Express.js + TypeScript

**Framework Principal**: Express.js v4.18
**Lenguaje**: TypeScript 5.x
**Base de Datos**: Almacenamiento en archivos JSON (desarrollo)

**Características Técnicas**:

- Arquitectura MVC (Modelo-Vista-Controlador)
- Middleware de validación personalizado
- Detección automática de framework de origen
- Rate limiting y seguridad con Helmet
- CORS configurado para múltiples orígenes
- Manejo de errores centralizado

**Dependencias Principales**:

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "morgan": "^1.10.0",
  "express-rate-limit": "^7.1.5"
}
```

### Frontend Web - Astro + React

**Framework Principal**: Astro v4.x
**Lenguaje**: TypeScript
**Componentes**: React v18
**Estilos**: Tailwind CSS v3

**Características Técnicas**:

- Arquitectura de islas (Island Architecture)
- Hidratación selectiva de componentes
- Integración con API REST del backend
- Componentes reutilizables en TypeScript
- Diseño responsivo con Tailwind

### Aplicación Móvil - Flutter + Dart

**Framework Principal**: Flutter v3.x
**Lenguaje**: Dart
**UI**: Material Design 3
**HTTP Client**: package:http

**Características Técnicas**:

- Aplicación nativa multiplataforma
- Gestión de estado con setState
- Validación de formularios integrada
- Interfaz completamente traducida al español
- Comunicación HTTP con backend Express

## 🔧 Elementos Técnicos Importantes

### 1. Detección de Framework de Origen

El sistema implementa middleware personalizado que detecta automáticamente desde qué plataforma se crean las tareas:

```typescript
// Middleware de detección
export const detectOriginFramework = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAgent = req.get("User-Agent") || "";
  const customHeader = req.get("X-Origin-Framework");

  if (customHeader === "flutter") {
    req.originFramework = "flutter";
  } else if (userAgent.includes("Mozilla")) {
    req.originFramework = "astro";
  }
  next();
};
```

### 2. API RESTful Estandarizada

Formato de respuesta consistente:

```json
{
  "success": boolean,
  "data": any,
  "error": string
}
```

### 3. Validación de Datos

- Middleware de validación personalizado
- Validaciones tanto en frontend como backend
- Campos opcionales manejados correctamente
- Sanitización de datos de entrada

### 4. Seguridad Implementada

- Rate limiting (100 requests/15min)
- Helmet para headers de seguridad
- CORS configurado específicamente
- Validación estricta de tipos TypeScript

## 📁 Estructura de Carpetas

```
gestor-tareas-completo/
├── README.md                    # Documentación principal
├── package.json                 # Scripts de desarrollo
├── backend/                     # Servidor Express.js (Puerto 3001)
│   ├── src/
│   │   ├── controllers/         # Lógica de negocio
│   │   ├── middleware/          # Middleware personalizado
│   │   ├── routes/              # Definición de rutas API
│   │   ├── services/            # Servicios de datos
│   │   ├── types/               # Definiciones TypeScript
│   │   └── index.ts             # Punto de entrada
│   ├── data/
│   │   └── tasks.json           # Almacenamiento de datos
│   ├── package.json
│   └── tsconfig.json
├── web-notes/                   # Frontend Astro (Puerto 4321)
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── lib/                 # Utilidades y configuración API
│   │   ├── pages/               # Páginas Astro
│   │   └── types/               # Tipos TypeScript
│   ├── public/                  # Archivos estáticos
│   └── package.json
└── app_notes/                   # Aplicación Flutter
    ├── lib/
    │   ├── models/              # Modelos de datos
    │   ├── screens/             # Pantallas de la app
    │   ├── services/            # Servicios HTTP
    │   └── utils/               # Utilidades y traducciones
    ├── assets/                  # Recursos de la app
    └── pubspec.yaml
```

## 🛠️ Solución de Problemas

### Error: Puerto en uso

Si los puertos 3001 o 4321 están ocupados:

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Error: Dependencias no instaladas

```bash
# Reinstalar todas las dependencias
npm run install:all

# O individualmente
npm run install:backend
npm run install:web
npm run install:mobile
```

### Error: Flutter no encontrado

```bash
# Verificar instalación de Flutter
flutter doctor

# Si no está instalado, seguir la guía oficial:
# https://docs.flutter.dev/get-started/install
```

### Error: CORS en producción

Si hay problemas de CORS, verificar la configuración en `backend/src/index.ts`:

```typescript
app.use(
  cors({
    origin: ["http://localhost:4321", "http://localhost:3000"],
    credentials: true,
  })
);
```
