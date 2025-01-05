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
    const isAdmin = await adminResponse.json();
    return isAdmin;
  } else {
    return false;
  }
}

export const isSomeoneLoggedIn = async (): Promise<{ isAdmin: boolean, isUser: boolean }> => {
  const responseAdmin = await fetch('/api/v1/login/isadminloggedin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseUser = await fetch('/api/v1/login/isuserloggedin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const isAdmin = responseAdmin.ok ? await responseAdmin.json() : false;
  const isUser = responseUser.ok ? await responseUser.json() : false;

  return { isAdmin, isUser };
}

export const logout = async (): Promise<void> => {
  const { isAdmin, isUser } = await isSomeoneLoggedIn();

  if (isAdmin || isUser) {
    await fetch('/api/v1/login/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Logout successful');
    window.location.href = '/'; // Redirect to homepage after logout
  } else {
    console.log('No one is logged in, cannot logout');
  }
}