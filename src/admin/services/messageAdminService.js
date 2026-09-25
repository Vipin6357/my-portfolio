const API_URL = import.meta.env.VITE_API_URL;

const getToken = () =>
  localStorage.getItem(
    "adminToken"
  );

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  };
};


// GET ALL
export const getAdminMessages =
  async () => {
    const response =
      await fetch(
        `${API_URL}/messages`,
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
          "Failed to fetch messages."
      );
    }

    return data.messages || [];
  };


// CREATE
export const createAdminMessage =
  async (messageData) => {
    const response =
      await fetch(
        `${API_URL}/messages/admin`,
        {
          method: "POST",
          headers: getHeaders(),

          body: JSON.stringify(
            messageData
          ),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to add message."
      );
    }

    return data.data;
  };


// UPDATE
export const updateAdminMessage =
  async (
    id,
    messageData
  ) => {
    const response =
      await fetch(
        `${API_URL}/messages/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),

          body: JSON.stringify(
            messageData
          ),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update message."
      );
    }

    return data.data;
  };


// STATUS
export const toggleAdminMessageStatus =
  async (id) => {
    const response =
      await fetch(
        `${API_URL}/messages/${id}/status`,
        {
          method: "PATCH",
          headers: getHeaders(),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update message status."
      );
    }

    return data.data;
  };


// DELETE
export const deleteAdminMessage =
  async (id) => {
    const response =
      await fetch(
        `${API_URL}/messages/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete message."
      );
    }

    return data;
  };