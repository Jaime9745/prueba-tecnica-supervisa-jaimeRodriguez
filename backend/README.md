# Backend - Servidor API de Gestión de Tareas

Un servidor API RESTful construido con Express.js y TypeScript para gestionar tareas desde múltiples frontends.

## Características

- **API RESTful completa** - Operaciones CRUD para tareas
- **TypeScript** - Tipado estático para mejor desarrollo
- **Detección de Framework de Origen** - Rastrea si las tareas vienen de Astro o Flutter
- **Validación de datos** - Middleware para validar peticiones entrantes
- **Manejo de errores** - Respuestas de error consistentes
- **CORS habilitado** - Soporte para peticiones cross-origin
- **Seguridad** - Middleware de seguridad con Helmet
- **Logging** - Registro de peticiones HTTP con Morgan
- **Rate limiting** - Protección contra abuso de la API

## Tecnologías

- **Express.js** - Framework web para Node.js
- **TypeScript** - Superset tipado de JavaScript
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Middleware de seguridad
- **Morgan** - Logger de peticiones HTTP
- **Express Rate Limit** - Limitación de velocidad de peticiones

## Instalación y Configuración

1. Navega a la carpeta del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Para compilar para producción:
   ```bash
   npm run build
   npm start
   ```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática

## Endpoints de la API

### Tareas

- **GET** `/api/tasks` - Obtener todas las tareas
- **POST** `/api/tasks` - Crear una nueva tarea
- **PUT** `/api/tasks/:id` - Actualizar una tarea existente
- **DELETE** `/api/tasks/:id` - Eliminar una tarea

### Salud del Sistema

- **GET** `/health` - Verificar estado del servidor

## Estructura de la Tarea

```json
{
  "task_id": "1748978242422",
  "title": "Título de la tarea",
  "description": "Descripción de la tarea",
  "due_date": "14/06/2025",
  "priority": "high",
  "status": "pending",
  "origin_framework": "astro",
  "user_email": "user@example.com"
}
```

### Campos Requeridos

- `title`: string (requerido)
- `description`: string (opcional)
- `priority`: "low" | "medium" | "high"
- `status`: "pending" | "in_progress" | "completed"
- `user_email`: string (requerido)

### Campos Opcionales

- `due_date`: string en formato "DD/MM/YYYY" (opcional)

### Campos Automáticos

- `task_id`: Generado automáticamente
- `origin_framework`: Detectado automáticamente ("astro" o "flutter")

## Detección de Framework de Origen

El servidor detecta automáticamente el framework de origen usando:

1. **Header personalizado**: `X-Origin-Framework` (preferido)
2. **User-Agent**: Si contiene "Flutter", se marca como "flutter"
3. **Predeterminado**: "astro" si no se puede determinar

## Respuestas de la API

### Formato de Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    /* datos de la respuesta */
  }
}
```

### Formato de Respuesta de Error

```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

## Validación de Datos

El servidor valida automáticamente:

- Tipos de datos requeridos
- Formatos de fecha válidos
- Valores de enumeración para priority y status
- Longitud mínima y máxima de strings

## Middleware Implementado

1. **CORS** - Permite peticiones cross-origin
2. **Helmet** - Establece headers de seguridad
3. **Morgan** - Registra peticiones HTTP
4. **Rate Limiting** - 100 peticiones por 15 minutos por IP
5. **JSON Parser** - Procesa cuerpos JSON
6. **Validación** - Valida datos de entrada
7. **Detección de Origen** - Detecta framework fuente
8. **Manejo de Errores** - Respuestas de error consistentes

## Estructura del Proyecto

```
backend/
├── src/
│   ├── index.ts                    # Punto de entrada del servidor
│   ├── types/
│   │   └── task.ts                # Definiciones de tipos TypeScript
│   ├── middleware/
│   │   ├── validation.ts          # Middleware de validación
│   │   ├── errorHandler.ts        # Manejo de errores
│   │   └── originDetection.ts     # Detección de framework
│   ├── services/
│   │   └── taskStorage.ts         # Servicio de almacenamiento
│   ├── controllers/
│   │   └── taskController.ts      # Lógica de controladores
│   └── routes/
│       └── tasks.ts               # Definición de rutas
├── data/
│   └── tasks.json                 # Almacenamiento de datos JSON
├── package.json                   # Dependencias y scripts
└── tsconfig.json                  # Configuración TypeScript
```

## Almacenamiento de Datos

Los datos se almacenan en un archivo JSON local (`data/tasks.json`) para simplicidad. En producción, esto debería reemplazarse con una base de datos real como PostgreSQL o MongoDB.

## Variables de Entorno

Crea un archivo `.env` para configuración:

```
PORT=3001
NODE_ENV=development
```

## Seguridad

- Headers de seguridad configurados con Helmet
- Rate limiting para prevenir abuso
- Validación de entrada para prevenir inyección
- CORS configurado para frontends específicos

## Desarrollo

El servidor está configurado con:

- Recarga automática en desarrollo usando `tsx watch`
- TypeScript para tipado estático
- Linting y formateo de código
- Manejo de errores robusto

## Logging

El servidor registra:

- Todas las peticiones HTTP (método, URL, código de estado, tiempo)
- Errores del servidor con stack traces
- Información de inicio del servidor

## Testing

Para probar la API, puedes usar:

```bash
# Verificar salud
curl http://localhost:3001/health

# Obtener todas las tareas
curl http://localhost:3001/api/tasks

# Crear una nueva tarea
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "X-Origin-Framework: test" \
  -d '{
    "title": "Tarea de prueba",
    "description": "Esta es una tarea de prueba",
    "priority": "medium",
    "status": "pending",
    "user_email": "test@example.com"
  }'
```

## Producción

Para despliegue en producción:

1. Compila el proyecto: `npm run build`
2. Configura variables de entorno apropiadas
3. Usa un administrador de procesos como PM2
4. Configura un proxy reverso (nginx/Apache)
5. Implementa una base de datos real
6. Configura SSL/HTTPS
