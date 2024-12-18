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