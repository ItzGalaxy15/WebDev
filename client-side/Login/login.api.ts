export const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await fetch("http://localhost:5097/api/v1/Login/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.text();
    if (response.ok) {
      return `Success: ${result}`;
    } else if (response.status === 409) {
      return `Conflict: ${result}`;
    } else {
      return `Error: ${result}`;
    }
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const isAdmin = async (): Promise<boolean> => {
  const adminResponse = await fetch('http://localhost:5097/api/v1/login/IsAdminLoggedIn', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials (cookies) in the request
  });

  if (adminResponse.ok) {
    const isAdmin = await adminResponse.json();
    return isAdmin;
  } else {
    return false;
  }
}

export const isSomeoneLoggedIn = async (): Promise<{ isAdmin: boolean, isUser: boolean }> => {
  const responseAdmin = await fetch('http://localhost:5097/api/v1/login/isadminloggedin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials (cookies) in the request
  });

  const responseUser = await fetch('http://localhost:5097/api/v1/login/isuserloggedin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials (cookies) in the request
  });

  const isAdmin = responseAdmin.ok ? await responseAdmin.json() : false;
  const isUser = responseUser.ok ? await responseUser.json() : false;

  return { isAdmin, isUser };
}

export const logout = async (): Promise<void> => {
  const { isAdmin, isUser } = await isSomeoneLoggedIn();

  if (isAdmin || isUser) {
    await fetch('http://localhost:5097/api/v1/login/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials (cookies) in the request
    });
    console.log('Logout successful');
    window.location.href = '/'; // Redirect to homepage after logout
  } else {
    console.log('No one is logged in, cannot logout');
  }
}