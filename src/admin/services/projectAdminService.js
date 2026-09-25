const API_URL = import.meta.env.VITE_API_URL;



export const getAdminProjects = async () => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch projects."
    );
  }

  return data.projects || [];
};



export const createProject = async (projectData) => {
  const token = localStorage.getItem("adminToken");

  const formData = new FormData();

  formData.append(
    "title",
    projectData.title
  );

  formData.append(
    "description",
    projectData.description
  );

  formData.append(
    "githubUrl",
    projectData.githubUrl
  );

  formData.append(
    "liveUrl",
    projectData.liveUrl
  );

  formData.append(
    "featured",
    projectData.featured
  );

  formData.append(
    "order",
    projectData.order
  );

  projectData.technologies.forEach(
    (technology) => {
      formData.append(
        "technologies",
        technology
      );
    }
  );

  projectData.images.forEach((image) => {
    formData.append(
      "images",
      image
    );
  });

  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create project."
    );
  }

  return data.project;
};



export const updateProject = async (
  id,
  projectData
) => {
  const token = localStorage.getItem("adminToken");

  const formData = new FormData();

  formData.append(
    "title",
    projectData.title
  );

  formData.append(
    "description",
    projectData.description
  );

  formData.append(
    "githubUrl",
    projectData.githubUrl
  );

  formData.append(
    "liveUrl",
    projectData.liveUrl
  );

  formData.append(
    "featured",
    projectData.featured
  );

  formData.append(
    "order",
    projectData.order
  );

  projectData.technologies.forEach(
    (technology) => {
      formData.append(
        "technologies",
        technology
      );
    }
  );

  projectData.images.forEach((image) => {
    formData.append(
      "images",
      image
    );
  });

  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update project."
    );
  }

  return data.project;
};



export const deleteProject = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to delete project."
    );
  }

  return data;
};