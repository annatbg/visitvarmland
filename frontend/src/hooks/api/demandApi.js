const API_URL = import.meta.env.VITE_API_URL;

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

export { createDemand };
