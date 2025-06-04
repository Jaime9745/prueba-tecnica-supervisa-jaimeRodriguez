import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import '../models/task.dart';
import '../services/task_service.dart';

class TaskUtils {
  static final TaskService _taskService = TaskService();

  // Export tasks to JSON string (for sharing or backup)
  static Future<String> exportTasksToJson() async {
    try {
      final tasks = await _taskService.loadTasks();
      final jsonList = tasks.map((task) => task.toJson()).toList();
      return json.encode(jsonList);
    } catch (e) {
      throw Exception('Error al exportar tareas: $e');
    }
  }

  // Import tasks from JSON string
  static Future<List<Task>> importTasksFromJson(String jsonString) async {
    try {
      final List<dynamic> jsonList = json.decode(jsonString);
      return jsonList.map((json) => Task.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Error al importar tareas: $e');
    }
  }

  // Get task statistics
  static Future<Map<String, int>> getTaskStatistics() async {
    try {
      final tasks = await _taskService.loadTasks();

      return {
        'total': tasks.length,
        'pending': tasks.where((t) => t.status == TaskStatus.pending).length,
        'in_progress': tasks
            .where((t) => t.status == TaskStatus.inProgress)
            .length,
        'completed': tasks
            .where((t) => t.status == TaskStatus.completed)
            .length,
        'high_priority': tasks
            .where((t) => t.priority == TaskPriority.high)
            .length,
        'medium_priority': tasks
            .where((t) => t.priority == TaskPriority.medium)
            .length,
        'low_priority': tasks
            .where((t) => t.priority == TaskPriority.low)
            .length,
      };
    } catch (e) {
      return {
        'total': 0,
        'pending': 0,
        'in_progress': 0,
        'completed': 0,
        'high_priority': 0,
        'medium_priority': 0,
        'low_priority': 0,
      };
    }
  }

  // Get overdue tasks
  static Future<List<Task>> getOverdueTasks() async {
    try {
      final tasks = await _taskService.loadTasks();
      final now = DateTime.now();

      return tasks.where((task) {
        if (task.dueDate == null || task.dueDate!.isEmpty) {
          return false; // No due date means not overdue
        }
        final dueDate = Task.parseDate(task.dueDate!);
        return dueDate != null &&
            dueDate.isBefore(now) &&
            task.status != TaskStatus.completed;
      }).toList();
    } catch (e) {
      return [];
    }
  }

  // Get tasks due today
  static Future<List<Task>> getTasksDueToday() async {
    try {
      final tasks = await _taskService.loadTasks();
      final today = DateTime.now();
      final todayString = Task.formatDate(today);

      return tasks
          .where(
            (task) =>
                task.dueDate != null &&
                task.dueDate == todayString &&
                task.status != TaskStatus.completed,
          )
          .toList();
    } catch (e) {
      return [];
    }
  }

  // Show confirmation dialog
  static Future<bool> showConfirmationDialog(
    BuildContext context, {
    required String title,
    required String content,
    String confirmText = 'Confirmar',
    String cancelText = 'Cancelar',
  }) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(cancelText),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(confirmText),
          ),
        ],
      ),
    );

    return result ?? false;
  }

  // Show snackbar message
  static void showMessage(
    BuildContext context,
    String message, {
    Color? backgroundColor,
    Duration duration = const Duration(seconds: 3),
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: backgroundColor,
        duration: duration,
      ),
    );
  }

  // Validate task data
  static String? validateTask({
    required String title,
    required String description,
    String? dueDate, // Made optional
  }) {
    if (title.trim().isEmpty) {
      return 'El título es requerido';
    }

    if (description.trim().isEmpty) {
      return 'La descripción es requerida';
    }

    // Due date is now optional
    if (dueDate != null && dueDate.trim().isNotEmpty) {
      final parsedDate = Task.parseDate(dueDate);
      if (parsedDate == null) {
        return 'Formato de fecha inválido';
      }
    }

    return null; // No validation errors
  }

  // Get file path info for debugging
  static Future<String> getFileInfo() async {
    try {
      final directory = await getApplicationDocumentsDirectory();
      final file = File('${directory.path}/tasks.json');
      final exists = await file.exists();
      final size = exists ? await file.length() : 0;

      return 'File: ${file.path}\nExists: $exists\nSize: $size bytes';
    } catch (e) {
      return 'Error obteniendo información del archivo: $e';
    }
  }
}
