import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/task.dart';
import '../config/app_config.dart';

class TaskService {
  // Headers for API calls
  static const Map<String, String> _headers = {
    'Content-Type': 'application/json',
    'X-Origin-Framework': 'flutter',
  };

  // Get full API URL
  String get _apiUrl => AppConfig.tasksApiUrl;

  // Handle API response and errors
  Map<String, dynamic> _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final data = json.decode(response.body);
      if (data['success'] == true) {
        return data;
      } else {
        throw Exception(data['error'] ?? 'API request failed');
      }
    } else {
      final errorData = json.decode(response.body);
      throw Exception(errorData['error'] ?? 'HTTP ${response.statusCode}');
    }
  }

  // Load all tasks from backend
  Future<List<Task>> loadTasks() async {
    try {
      final response = await http.get(Uri.parse(_apiUrl), headers: _headers);

      final data = _handleResponse(response);      final List<dynamic> tasksJson = data['data'] ?? [];
      return tasksJson.map((json) => Task.fromJson(json)).toList();
    } catch (e) {
      debugPrint('Error loading tasks: $e');
      throw Exception('Error al cargar tareas: $e');
    }
  }

  // Add a new task to backend
  Future<Task> addTask(Task task) async {
    try {
      final taskData = {
        'title': task.title,
        'description': task.description,
        'due_date': task.dueDate ?? '',
        'priority': task.priority,
        'status': task.status,
      };

      final response = await http.post(
        Uri.parse(_apiUrl),
        headers: _headers,
        body: json.encode(taskData),
      );      final data = _handleResponse(response);
      return Task.fromJson(data['data']);
    } catch (e) {
      debugPrint('Error adding task: $e');
      throw Exception('Error al agregar tarea: $e');
    }
  }

  // Update an existing task on backend
  Future<Task> updateTask(Task updatedTask) async {
    try {
      final taskData = {
        'title': updatedTask.title,
        'description': updatedTask.description,
        'due_date': updatedTask.dueDate ?? '',
        'priority': updatedTask.priority,
        'status': updatedTask.status,
      };

      final response = await http.put(
        Uri.parse('$_apiUrl/${updatedTask.taskId}'),
        headers: _headers,
        body: json.encode(taskData),
      );      final data = _handleResponse(response);
      return Task.fromJson(data['data']);
    } catch (e) {
      debugPrint('Error updating task: $e');
      throw Exception('Error al actualizar tarea: $e');
    }
  }

  // Delete a task from backend
  Future<void> deleteTask(String taskId) async {
    try {
      final response = await http.delete(
        Uri.parse('$_apiUrl/$taskId'),
        headers: _headers,
      );      _handleResponse(response);
    } catch (e) {
      debugPrint('Error deleting task: $e');
      throw Exception('Error al eliminar tarea: $e');
    }
  }

  // Get a specific task by ID
  Future<Task?> getTaskById(String taskId) async {
    try {
      final response = await http.get(
        Uri.parse('$_apiUrl/$taskId'),
        headers: _headers,
      );      final data = _handleResponse(response);
      return Task.fromJson(data['data']);
    } catch (e) {
      debugPrint('Error getting task: $e');
      return null;
    }
  }

  // Get tasks by status (client-side filtering)
  Future<List<Task>> getTasksByStatus(String status) async {
    final tasks = await loadTasks();
    return tasks.where((task) => task.status == status).toList();
  }

  // Get tasks by priority (client-side filtering)
  Future<List<Task>> getTasksByPriority(String priority) async {
    final tasks = await loadTasks();
    return tasks.where((task) => task.priority == priority).toList();
  }

  // Health check to verify backend connection
  Future<bool> checkConnection() async {
    try {
      final response = await http.get(
        Uri.parse(AppConfig.healthApiUrl),
        headers: _headers,      );
      return response.statusCode == 200;
    } catch (e) {
      debugPrint('Backend connection failed: $e');
      return false;
    }
  }
}
