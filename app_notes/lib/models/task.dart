import 'package:intl/intl.dart';

class Task {
  final String taskId;
  final String title;
  final String description;
  final String dueDate;
  final String priority;
  final String status;
  final String originFramework;
  final String userEmail;

  Task({
    required this.taskId,
    required this.title,
    required this.description,
    required this.dueDate,
    required this.priority,
    required this.status,
    this.originFramework = 'flutter',
    this.userEmail = '2220211014@estudiantesunibague.edu.co',
  });

  // Create a task from JSON
  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      taskId: json['task_id'],
      title: json['title'],
      description: json['description'],
      dueDate: json['due_date'],
      priority: json['priority'],
      status: json['status'],
      originFramework: json['origin_framework'] ?? 'flutter',
      userEmail: json['user_email'] ?? 'user@example.com',
    );
  }

  // Convert task to JSON
  Map<String, dynamic> toJson() {
    return {
      'task_id': taskId,
      'title': title,
      'description': description,
      'due_date': dueDate,
      'priority': priority,
      'status': status,
      'origin_framework': originFramework,
      'user_email': userEmail,
    };
  }

  // Create a copy of task with updated fields
  Task copyWith({
    String? taskId,
    String? title,
    String? description,
    String? dueDate,
    String? priority,
    String? status,
    String? originFramework,
    String? userEmail,
  }) {
    return Task(
      taskId: taskId ?? this.taskId,
      title: title ?? this.title,
      description: description ?? this.description,
      dueDate: dueDate ?? this.dueDate,
      priority: priority ?? this.priority,
      status: status ?? this.status,
      originFramework: originFramework ?? this.originFramework,
      userEmail: userEmail ?? this.userEmail,
    );
  }

  // Generate a new task ID based on timestamp
  static String generateTaskId() {
    return DateTime.now().millisecondsSinceEpoch.toString();
  }

  // Format date for display
  static String formatDate(DateTime date) {
    return DateFormat('dd/MM/yyyy').format(date);
  }

  // Parse date from string
  static DateTime? parseDate(String dateString) {
    try {
      return DateFormat('dd/MM/yyyy').parse(dateString);
    } catch (e) {
      return null;
    }
  }
}

// Enum-like constants for priority and status
class TaskPriority {
  static const String low = 'low';
  static const String medium = 'medium';
  static const String high = 'high';

  static List<String> get values => [low, medium, high];
}

class TaskStatus {
  static const String pending = 'pending';
  static const String inProgress = 'in_progress';
  static const String completed = 'completed';

  static List<String> get values => [pending, inProgress, completed];
}
