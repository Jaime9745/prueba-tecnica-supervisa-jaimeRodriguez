import 'package:flutter/material.dart';
import '../models/task.dart';
import '../services/task_service.dart';
import 'task_form_screen.dart';
import 'task_detail_screen.dart';

class TaskListScreen extends StatefulWidget {
  const TaskListScreen({super.key});

  @override
  State<TaskListScreen> createState() => _TaskListScreenState();
}

class _TaskListScreenState extends State<TaskListScreen> {
  final TaskService _taskService = TaskService();
  List<Task> _tasks = [];
  String _selectedFilter = 'all';
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadTasks();
  }

  Future<void> _loadTasks() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final tasks = await _taskService.loadTasks();
      setState(() {
        _tasks = tasks;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error loading tasks: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  List<Task> get _filteredTasks {
    switch (_selectedFilter) {
      case 'pending':
        return _tasks
            .where((task) => task.status == TaskStatus.pending)
            .toList();
      case 'in_progress':
        return _tasks
            .where((task) => task.status == TaskStatus.inProgress)
            .toList();
      case 'completed':
        return _tasks
            .where((task) => task.status == TaskStatus.completed)
            .toList();
      default:
        return _tasks;
    }
  }

  Future<void> _deleteTask(String taskId) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Task'),
        content: const Text('Are you sure you want to delete this task?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      try {
        await _taskService.deleteTask(taskId);
        await _loadTasks();
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Task deleted successfully'),
              backgroundColor: Colors.green,
            ),
          );
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Error deleting task: $e'),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    }
  }

  Future<void> _navigateToTaskForm([Task? task]) async {
    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (context) => TaskFormScreen(task: task)),
    );

    if (result == true) {
      await _loadTasks();
    }
  }

  Future<void> _navigateToTaskDetail(Task task) async {
    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (context) => TaskDetailScreen(task: task)),
    );

    if (result == true) {
      await _loadTasks(); // Reload tasks if task was deleted from detail screen
    }
  }

  Color _getPriorityColor(String priority) {
    switch (priority) {
      case TaskPriority.high:
        return Colors.red;
      case TaskPriority.medium:
        return Colors.orange;
      case TaskPriority.low:
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case TaskStatus.pending:
        return Colors.grey;
      case TaskStatus.inProgress:
        return Colors.blue;
      case TaskStatus.completed:
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Manager'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          PopupMenuButton<String>(
            icon: const Icon(Icons.filter_list),
            onSelected: (value) {
              setState(() {
                _selectedFilter = value;
              });
            },
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'all', child: Text('All Tasks')),
              const PopupMenuItem(value: 'pending', child: Text('Pending')),
              const PopupMenuItem(
                value: 'in_progress',
                child: Text('In Progress'),
              ),
              const PopupMenuItem(value: 'completed', child: Text('Completed')),
            ],
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _filteredTasks.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.task_alt, size: 64, color: Colors.grey[400]),
                  const SizedBox(height: 16),
                  Text(
                    _selectedFilter == 'all'
                        ? 'No tasks yet'
                        : 'No ${_selectedFilter.replaceAll('_', ' ')} tasks',
                    style: Theme.of(
                      context,
                    ).textTheme.titleLarge?.copyWith(color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Tap the + button to add a new task',
                    style: TextStyle(color: Colors.grey),
                  ),
                ],
              ),
            )
          : RefreshIndicator(
              onRefresh: _loadTasks,
              child: ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: _filteredTasks.length,
                itemBuilder: (context, index) {
                  final task = _filteredTasks[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 4),
                    child: ListTile(
                      title: Text(
                        task.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            task.description,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Icon(
                                Icons.calendar_today,
                                size: 16,
                                color: Colors.grey[600],
                              ),
                              const SizedBox(width: 4),
                              Text(
                                task.dueDate,
                                style: TextStyle(color: Colors.grey[600]),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              // Priority badge
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 4,
                                ),
                                decoration: BoxDecoration(
                                  color: _getPriorityColor(task.priority),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  task.priority.toUpperCase(),
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              // Status badge
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 4,
                                ),
                                decoration: BoxDecoration(
                                  color: _getStatusColor(task.status),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  task.status
                                      .replaceAll('_', ' ')
                                      .toUpperCase(),
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      trailing: PopupMenuButton<String>(
                        onSelected: (value) {
                          switch (value) {
                            case 'edit':
                              _navigateToTaskForm(task);
                              break;
                            case 'delete':
                              _deleteTask(task.taskId);
                              break;
                          }
                        },
                        itemBuilder: (context) => [
                          const PopupMenuItem(
                            value: 'edit',
                            child: Row(
                              children: [
                                Icon(Icons.edit),
                                SizedBox(width: 8),
                                Text('Edit'),
                              ],
                            ),
                          ),
                          const PopupMenuItem(
                            value: 'delete',
                            child: Row(
                              children: [
                                Icon(Icons.delete, color: Colors.red),
                                SizedBox(width: 8),
                                Text(
                                  'Delete',
                                  style: TextStyle(color: Colors.red),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      onTap: () => _navigateToTaskDetail(task),
                    ),
                  );
                },
              ),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _navigateToTaskForm(),
        tooltip: 'Add Task',
        child: const Icon(Icons.add),
      ),
    );
  }
}
