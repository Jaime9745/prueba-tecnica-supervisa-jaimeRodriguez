# Gestor de Tareas - Aplicación Móvil

Una aplicación Flutter para gestión de tareas que se conecta a un backend Express.js.

## Características

- **Crear** nuevas tareas con título, descripción, fecha límite, prioridad y estado
- **Ver** todas las tareas en una lista con opciones de filtrado
- **Actualizar** tareas existentes
- **Eliminar** tareas con diálogo de confirmación
- **Persistencia con API** - las tareas se guardan a través de una API REST
- **Filtrar tareas** por estado (todos, pendiente, en progreso, completada)
- **Niveles de prioridad**: baja, media, alta
- **Opciones de estado**: pendiente, en_progreso, completada
- **Interfaz en Español** - Completamente traducida al español
- **Botón de Actualización** - Actualización manual de la lista de tareas
- **Detección de Origen** - Las tareas se marcan como creadas desde Flutter

## Estructura de Tareas

Cada tarea se almacena como JSON con la siguiente estructura:

```json
{
  "task_id": "1748978242422",
  "title": "Revisar presupuesto mensual",
  "description": "Revisar todos los gastos del mes de mayo, comparar con el presupuesto inicial y preparar informe para la reunión del viernes",
  "due_date": "14/06/2025",
  "priority": "high",
  "status": "pending",
  "origin_framework": "flutter",
  "user_email": "user@example.com"
}
```

## Campos de Entrada del Usuario

Los usuarios solo necesitan proporcionar:

- **Título** (requerido)
- **Descripción** (opcional)
- **Fecha Límite** (opcional) - seleccionada a través del selector de fecha
- **Prioridad** (dropdown): "baja", "media", "alta"
- **Estado** (dropdown): "pendiente", "en_progreso", "completada"

La aplicación genera automáticamente:

- `task_id`: identificador único basado en timestamp
- `origin_framework`: establecido como "flutter"
- `user_email`: valor predeterminado (puede personalizarse)

## Instalación y Configuración

1. Asegúrate de tener Flutter instalado
2. Clona o descarga este proyecto
3. Ejecuta `flutter pub get` para instalar dependencias
4. Asegúrate de que el backend Express.js esté ejecutándose en localhost:3001
5. Ejecuta `flutter run` para iniciar la aplicación

## Dependencias

- `http`: Para comunicación con la API REST
- `intl`: Para formateo de fechas
- `cupertino_icons`: Para iconos estilo iOS

## Comunicación con la API

La aplicación se conecta a un backend Express.js ejecutándose en `http://localhost:3001/api/tasks`.

Los headers de petición incluyen:

- `Content-Type: application/json`
- `X-Origin-Framework: flutter` (para detección de origen)

## Uso

1. **Agregar Tarea**: Toca el botón flotante "+"
2. **Ver Tareas**: Todas las tareas se muestran en la pantalla principal
3. **Filtrar Tareas**: Usa los dropdowns de filtro para mostrar tareas por estado y prioridad
4. **Editar Tarea**: Toca cualquier tarea para ver detalles, luego usa el botón editar
5. **Eliminar Tarea**: Usa el menú de tres puntos en cualquier tarea o desde la pantalla de detalles
6. **Actualizar**: Usa el botón de actualización en la barra superior o desliza hacia abajo

## Características de la UI

- **Prioridades codificadas por color**: Rojo (alta), Naranja (media), Verde (baja)
- **Badges de estado**: Indicadores visuales para el estado de la tarea
- **Selector de fecha**: Selección fácil de fechas para fechas límite
- **Diseño responsivo**: Funciona en varios tamaños de pantalla
- **Material Design**: Componentes modernos de Flutter UI
- **Interfaz en Español**: Toda la UI está traducida al español
- **Gestos de deslizar**: Deslizar para editar (izquierda a derecha) o eliminar (derecha a izquierda)

## Estructura del Proyecto

```
lib/
├── main.dart                 # Punto de entrada de la aplicación
├── config/
│   └── app_config.dart      # Configuración del backend
├── models/
│   └── task.dart            # Modelo de tarea y constantes
├── services/
│   └── task_service.dart    # Operaciones HTTP con la API
├── screens/
│   ├── task_list_screen.dart    # Vista principal de lista de tareas
│   ├── task_form_screen.dart    # Formulario agregar/editar tarea
│   └── task_detail_screen.dart  # Vista de detalles de tarea
└── utils/
    ├── task_utils.dart          # Utilidades y validaciones
    └── translations.dart        # Mapeos de traducción al español
```

## Conectividad API

La aplicación requiere conectividad de red para comunicarse con el backend Express.js. Sin conexión a la red, la aplicación mostrará mensajes de error apropiados.

## Traducciones

La aplicación está completamente traducida al español, incluyendo:

- Títulos de pantallas y botones
- Mensajes de validación y error
- Etiquetas de formularios
- Texto de estado y prioridad
- Diálogos de confirmación

## Configuración de Desarrollo

Para desarrollo, asegúrate de que el backend esté ejecutándose en `localhost:3001`. Para producción, actualiza la URL en `lib/config/app_config.dart`.

## Manejo de Errores

La aplicación maneja varios escenarios de error:

- Errores de conectividad de red
- Respuestas de error del servidor
- Errores de validación de datos
- Timeouts de peticiones
