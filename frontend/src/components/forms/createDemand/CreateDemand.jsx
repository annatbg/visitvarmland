import React, { useState } from "react";
import { createDemand } from "../../../hooks/api/demandApi";
import useUser from "../../../store/useUser";
import "./CreateDemand.css";

const CreateDemand = () => {
  const [formData, setFormData] = useState({
    title: "",
    demand: "",
    category: "",
    author: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const user = useUser((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.demand.trim() ||
      !formData.category.trim() ||
      !formData.author.trim()
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
      await createDemand({ formData });
      setFormData({ title: "", demand: "", category: "", author: "" });
      setSuccessMessage("Demand created successfully!");
    } catch (error) {
      setError(error.message || "An error occurred while creating the demand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3
        className="demandForm-heading"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        Skapa nytt behov
        <span className="demandForm-arrow">{isFormOpen ? "▲" : "▼"}</span>
      </h3>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="demandForm-form">
          <label htmlFor="title" className="demandForm-label">
            Rubrik:
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Skriv en rubrik"
            className="demandForm-input"
            disabled={loading}
          />

          <label htmlFor="demand" className="demandForm-label">
            Behov:
          </label>
          <input
            type="text"
            id="demand"
            value={formData.demand}
            onChange={handleChange}
            placeholder="Beskriv ditt behov..."
            className="demandForm-input"
            disabled={loading}
          />

          <label htmlFor="category" className="demandForm-label">
            Kategori:
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Vilken kategori tillhör ditt behov"
            className="demandForm-input"
            disabled={loading}
          />

          <label htmlFor="author" className="demandForm-label">
            Författare:
          </label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Ditt namn"
            className="demandForm-input"
            disabled={loading}
          />

          {error && <p className="demandForm-error">{error}</p>}
          {successMessage && (
            <p className="demandForm-success">{successMessage}</p>
          )}

          <button
            type="submit"
            className="demandForm-button"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Skapa behov"}
          </button>
        </form>
      )}
    </>
  );
};

export default CreateDemand;
