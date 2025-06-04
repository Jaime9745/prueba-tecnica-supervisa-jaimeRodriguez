# Task Manager App

A Flutter CRUD application for task management with local JSON file persistence.

## Features

- **Create** new tasks with title, description, due date, priority, and status
- **Read/View** all tasks in a list with filtering options
- **Update** existing tasks
- **Delete** tasks with confirmation dialog
- **Local JSON persistence** - tasks are saved to a local JSON file
- **Filter tasks** by status (all, pending, in progress, completed)
- **Priority levels**: low, medium, high
- **Status options**: pending, in_progress, completed

## Task Structure

Each task is stored as JSON with the following structure:

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

## User Input Fields

Users only need to provide:

- **Title** (required)
- **Description** (required)
- **Due Date** (required) - selected via date picker
- **Priority** (dropdown): "low", "medium", "high"
- **Status** (dropdown): "pending", "in_progress", "completed"

The app automatically generates:

- `task_id`: timestamp-based unique identifier
- `origin_framework`: set to "flutter"
- `user_email`: default value (can be customized)

## Installation and Setup

1. Make sure you have Flutter installed
2. Clone or download this project
3. Run `flutter pub get` to install dependencies
4. Run `flutter run` to start the app

## Dependencies

- `path_provider`: For accessing device file system
- `intl`: For date formatting
- `cupertino_icons`: For iOS-style icons

## File Storage

Tasks are stored in a local JSON file (`tasks.json`) in the device's documents directory. The file is automatically created when you add your first task.

## Usage

1. **Add a Task**: Tap the "+" floating action button
2. **View Tasks**: All tasks are displayed on the main screen
3. **Filter Tasks**: Use the filter menu (top-right) to show tasks by status
4. **Edit a Task**: Tap on any task or use the menu (three dots)
5. **Delete a Task**: Use the menu (three dots) on any task
6. **Refresh**: Pull down to refresh the task list

## UI Features

- **Color-coded priorities**: Red (high), Orange (medium), Green (low)
- **Status badges**: Visual indicators for task status
- **Date picker**: Easy date selection for due dates
- **Responsive design**: Works on various screen sizes
- **Material Design**: Modern Flutter UI components

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/
│   └── task.dart            # Task model and constants
├── services/
│   └── task_service.dart    # JSON file operations
└── screens/
    ├── task_list_screen.dart # Main task list view
    └── task_form_screen.dart # Add/edit task form
```

## Data Persistence

The app uses local file storage with JSON format for data persistence. All tasks are automatically saved to a local file and loaded when the app starts. No internet connection is required.
