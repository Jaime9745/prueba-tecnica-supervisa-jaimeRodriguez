class Translations {
  static const Map<String, String> priority = {
    'low': 'Baja',
    'medium': 'Media',
    'high': 'Alta',
  };

  static const Map<String, String> status = {
    'pending': 'Pendiente',
    'in_progress': 'En Progreso',
    'completed': 'Completada',
  };

  static String getPriorityText(String priority) {
    return Translations.priority[priority] ?? priority.toUpperCase();
  }

  static String getStatusText(String status) {
    return Translations.status[status] ??
        status.replaceAll('_', ' ').toUpperCase();
  }
}
