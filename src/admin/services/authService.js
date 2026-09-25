const API_URL = import.meta.env.VITE_API_URL;



export const loginAdmin = async (email, password) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed."
    );
  }

  localStorage.setItem(
    "adminToken",
    data.token
  );

  localStorage.setItem(
    "adminUser",
    JSON.stringify(data.admin)
  );

  return data;
};


export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};



export const getAdminUser = () => {
  const user = localStorage.getItem("adminUser");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};



export const isAdminAuthenticated = () => {
  return Boolean(getAdminToken());
};



export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
};