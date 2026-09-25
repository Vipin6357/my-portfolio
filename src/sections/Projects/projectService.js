const API_URL = import.meta.env.VITE_API_URL;

export const getProjects = async () => {
  const response = await fetch(
    `${API_URL}/projects`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch projects."
    );
  }

  return data.projects || [];
};