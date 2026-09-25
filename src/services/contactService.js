const API_URL = import.meta.env.VITE_API_URL;

export const sendContactMessage =
  async ({
    name,
    email,
    message,
  }) => {
    const response =
      await fetch(
        `${API_URL}/messages`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to send message."
      );
    }

    return data;
  };