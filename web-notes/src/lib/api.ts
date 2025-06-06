// API Configuration
export const API_CONFIG = {
  BASE_URL: "http://localhost:3001",
  ENDPOINTS: {
    TASKS: "/api/tasks",
    HEALTH: "/health",
  },
};

// API helper functions
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};
