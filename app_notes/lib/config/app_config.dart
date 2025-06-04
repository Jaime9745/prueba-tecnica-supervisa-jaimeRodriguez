import 'dart:io';

class AppConfig {
  // Backend configuration
  // Detect the correct URL based on platform
  static String get baseUrl {
    if (Platform.isAndroid) {
      // Android emulator uses 10.0.2.2 to access host machine
      return 'http://10.0.2.2:3001';
    } else if (Platform.isIOS) {
      // iOS simulator can use localhost
      return 'http://localhost:3001';
    } else {
      // Web, desktop, or other platforms
      return 'http://localhost:3001';
    }
  }

  // API endpoints
  static String get tasksApiUrl => '$baseUrl/api/tasks';
  static String get healthApiUrl => '$baseUrl/health';

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
