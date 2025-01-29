const API_URL = import.meta.env.VITE_API_URL;

const loginUser = async (email, password) => {
  try {
    const response = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || "Login failed");
    }
  } catch (error) {
    throw new Error("An error occurred while logging in: " + error.message);
  }
};

const signupUser = async (formData) => {
  try {
    const response = await fetch(API_URL + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || "Signup failed");
    }
  } catch (error) {
    throw new Error("An error occurred while signing up: " + error.message);
  }
};

const createDemand = async (formData) => {
  try {
    const response = await fetch(API_URL + "/demand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || "Failed to create demand");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while creating demand: " + error.message
    );
  }
};

export { loginUser, signupUser, createDemand };
