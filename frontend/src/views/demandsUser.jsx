import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createDemand } from "../hooks/api/authApi";
import useUser from "../store/useUser";

function DemandsUser() {
  const [demand, setDemand] = useState("");
  const user = useUser((state) => state.user);

  // Temporary placeholder for author
  const author = user; // Replace with logic to get the logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!demand) {
      alert("Please enter a demand!");
      return;
    }

    const newDemand = {
      demandId: uuidv4(),
      demand,
      author,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await createDemand(newDemand); // Call your API/database logic here
      console.log("Demand created successfully:", result);

      // Clear the input field after successful creation
      setDemand("");
    } catch (error) {
      alert(error.message || "An error occurred while creating demand.");
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
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
        >
          Create Demand
        </button>
      </form>
    </div>
  );
}

export default DemandsUser;
