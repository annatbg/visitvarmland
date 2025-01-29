import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createDemand } from "../../hooks/api/authApi";
import useUser from "../../store/useUser";

const DemandsView = () => {
  const [demand, setDemand] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useUser((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!demand.trim()) {
      setError("Please enter a valid demand.");
      return;
    }

    if (!user) {
      setError("User not found. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);

    const newDemand = {
      demandId: uuidv4(),
      demand,
      author: user,
      createdAt: new Date().toISOString(),
    };

    try {
      await createDemand(newDemand);
      setDemand("");
    } catch (error) {
      setError(error.message || "An error occurred while creating the demand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homeView">
      <h1>Demands View</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="demand" className="text-lg font-medium">
          Enter your demand:
        </label>
        <input
          type="text"
          id="demand"
          value={demand}
          onChange={(e) => setDemand(e.target.value)}
          placeholder="Write your demand here..."
          className="border border-gray-300 rounded-lg p-2"
          disabled={loading}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Demand"}
        </button>
      </form>
    </div>
  );
};

export default DemandsView;
