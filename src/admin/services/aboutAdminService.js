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


// GET ABOUT
export const getAdminAbout =
  async () => {
    const response = await fetch(
      `${API_URL}/about`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch about section."
      );
    }

    return data.about;
  };


// UPDATE ABOUT
export const updateAbout =
  async (aboutData) => {
    const response = await fetch(
      `${API_URL}/about`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(
          aboutData
        ),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update about section."
      );
    }

    return data.about;
  };