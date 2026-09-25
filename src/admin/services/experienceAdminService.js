const API_URL = import.meta.env.VITE_API_URL;

const getToken = () =>
  localStorage.getItem("adminToken");

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET ALL
export const getAdminExperiences =
  async () => {
    const response = await fetch(
      `${API_URL}/experience`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch experiences."
      );
    }

    return data.experiences || [];
  };

// GET SINGLE
export const getAdminExperience =
  async (id) => {
    const response = await fetch(
      `${API_URL}/experience/${id}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch experience."
      );
    }

    return data.experience;
  };

// CREATE
export const createExperience =
  async (experienceData) => {
    const response = await fetch(
      `${API_URL}/experience`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(
          experienceData
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to create experience."
      );
    }

    return data.experience;
  };

// UPDATE
export const updateExperience =
  async (id, experienceData) => {
    const response = await fetch(
      `${API_URL}/experience/${id}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(
          experienceData
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update experience."
      );
    }

    return data.experience;
  };

// DELETE
export const deleteExperience =
  async (id) => {
    const response = await fetch(
      `${API_URL}/experience/${id}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete experience."
      );
    }

    return data;
  };