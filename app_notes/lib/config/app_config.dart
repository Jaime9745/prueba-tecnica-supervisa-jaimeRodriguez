class AppConfig {
  // Backend configuration
  static const String baseUrl = 'http://localhost:3001';

  // API endpoints
  static const String tasksApiUrl = '$baseUrl/api/tasks';
  static const String healthApiUrl = '$baseUrl/health';

  // App configuration
  static const String appName = 'Gestor de Tareas';
  static const String version = '1.0.0';

  // Default values
  static const String defaultUserEmail =
      '2220211014@estudiantesunibague.edu.co';

  // Request timeout
  static const Duration requestTimeout = Duration(seconds: 30);

  // Development settings
  static const bool isDevelopment = true;
  static const bool enableLogging = true;
}
