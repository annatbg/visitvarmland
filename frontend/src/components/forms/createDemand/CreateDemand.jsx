// src/components/DemandForm.js
import React, { useState } from "react";
import { createDemand } from "../../../hooks/api/demandApi";
import useUser from "../../../store/useUser";
import "./CreateDemand.css";

const CreateDemand = () => {
  const [formData, setFormData] = useState({
    title: "",
    demand: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const user = useUser((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.demand.trim() ||
      !formData.category.trim()
    ) {
      setError("All fields are required.");
      setSuccessMessage(null);
      return;
    }

    if (!user) {
      setError("User not found. Please log in.");
      setSuccessMessage(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await createDemand({ ...formData, author: user });
      setFormData({ title: "", demand: "", category: "" });
      setSuccessMessage("Demand created successfully!");
    } catch (error) {
      setError(error.message || "An error occurred while creating the demand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="demandview-form">
      <label htmlFor="title" className="demandview-label">
        Title:
      </label>
      <input
        type="text"
        id="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter a title"
        className="demandview-input"
        disabled={loading}
      />

      <label htmlFor="demand" className="demandview-label">
        Demand:
      </label>
      <input
        type="text"
        id="demand"
        value={formData.demand}
        onChange={handleChange}
        placeholder="Write your demand here..."
        className="demandview-input"
        disabled={loading}
      />

      <label htmlFor="category" className="demandview-label">
        Category:
      </label>
      <input
        type="text"
        id="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Enter category"
        className="demandview-input"
        disabled={loading}
      />

      {error && <p className="demandview-error">{error}</p>}
      {successMessage && <p className="demandview-success">{successMessage}</p>}
      <button type="submit" className="demandview-button" disabled={loading}>
        {loading ? "Submitting..." : "Create Demand"}
      </button>
    </form>
  );
};

export default CreateDemand;
