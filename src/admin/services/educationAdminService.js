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
export const getAdminEducations =
  async () => {
    const response = await fetch(
      `${API_URL}/education`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch education."
      );
    }

    return data.educations || [];
  };

// GET SINGLE
export const getAdminEducation =
  async (id) => {
    const response = await fetch(
      `${API_URL}/education/${id}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch education."
      );
    }

    return data.education;
  };

// CREATE
export const createEducation =
  async (educationData) => {
    const response = await fetch(
      `${API_URL}/education`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(
          educationData
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to create education."
      );
    }

    return data.education;
  };

// UPDATE
export const updateEducation =
  async (id, educationData) => {
    const response = await fetch(
      `${API_URL}/education/${id}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(
          educationData
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update education."
      );
    }

    return data.education;
  };

// DELETE
export const deleteEducation =
  async (id) => {
    const response = await fetch(
      `${API_URL}/education/${id}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete education."
      );
    }

    return data;
  };