import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../models/task.dart';

class TaskService {
  static const String _fileName = 'tasks.json';

  // Get the local file path
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }

  // Get the local file
  Future<File> get _localFile async {
    final path = await _localPath;
    return File('$path/$_fileName');
  }

  // Read tasks from JSON file
  Future<List<Task>> loadTasks() async {
    try {
      final file = await _localFile;

      if (!await file.exists()) {
        return [];
      }

      final contents = await file.readAsString();
      if (contents.isEmpty) {
        return [];
      }

      final List<dynamic> jsonList = json.decode(contents);
      return jsonList.map((json) => Task.fromJson(json)).toList();
    } catch (e) {
      print('Error loading tasks: $e');
      return [];
    }
  }

  // Save tasks to JSON file
  Future<void> saveTasks(List<Task> tasks) async {
    try {
      final file = await _localFile;
      final jsonList = tasks.map((task) => task.toJson()).toList();
      final jsonString = json.encode(jsonList);
      await file.writeAsString(jsonString);
    } catch (e) {
      print('Error saving tasks: $e');
      throw Exception('Failed to save tasks: $e');
    }
  }

  // Add a new task
  Future<void> addTask(Task task) async {
    final tasks = await loadTasks();
    tasks.add(task);
    await saveTasks(tasks);
  }

  // Update an existing task
  Future<void> updateTask(Task updatedTask) async {
    final tasks = await loadTasks();
    final index = tasks.indexWhere((task) => task.taskId == updatedTask.taskId);

    if (index != -1) {
      tasks[index] = updatedTask;
      await saveTasks(tasks);
    } else {
      throw Exception('Task not found');
    }
  }

  // Delete a task
  Future<void> deleteTask(String taskId) async {
    final tasks = await loadTasks();
    tasks.removeWhere((task) => task.taskId == taskId);
    await saveTasks(tasks);
  }

  // Get a specific task by ID
  Future<Task?> getTaskById(String taskId) async {
    final tasks = await loadTasks();
    try {
      return tasks.firstWhere((task) => task.taskId == taskId);
    } catch (e) {
      return null;
    }
  }

  // Get tasks by status
  Future<List<Task>> getTasksByStatus(String status) async {
    final tasks = await loadTasks();
    return tasks.where((task) => task.status == status).toList();
  }

  // Get tasks by priority
  Future<List<Task>> getTasksByPriority(String priority) async {
    final tasks = await loadTasks();
    return tasks.where((task) => task.priority == priority).toList();
  }
}
