const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("adminToken");
};

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET ALL SKILLS
export const getAdminSkills = async () => {
  const response = await fetch(`${API_URL}/skills`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch skills."
    );
  }

  return data.skills || [];
};

// GET SINGLE SKILL
export const getAdminSkill = async (id) => {
  const response = await fetch(
    `${API_URL}/skills/${id}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch skill."
    );
  }

  return data.skill;
};

// CREATE SKILL
export const createSkill = async (skillData) => {
  const response = await fetch(`${API_URL}/skills`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(skillData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create skill."
    );
  }

  return data.skill;
};

// UPDATE SKILL
export const updateSkill = async (
  id,
  skillData
) => {
  const response = await fetch(
    `${API_URL}/skills/${id}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(skillData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update skill."
    );
  }

  return data.skill;
};

// DELETE SKILL
export const deleteSkill = async (id) => {
  const response = await fetch(
    `${API_URL}/skills/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete skill."
    );
  }

  return data;
};