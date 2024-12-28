export const login = async (username: string, password: string): Promise<string> => {
  const response = await fetch("/api/v1/Login/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.text();
  if (response.ok) {
    return `Success: ${result}`;
  } else {
    return `Error: ${result}`;
  }
};

export const isAdmin = async (): Promise<boolean> => {
  const adminResponse = await fetch('/api/v1/login/IsAdminLoggedIn', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (adminResponse.ok) {
    return true;
  } else {
    return false;
  }
}