import React from "react";
import CreateDemandForm from "../../components/forms/createDemand/CreateDemand";

const DemandsView = () => {
  return (
    <div className="demandview-container">
      <h1 className="demandview-title">Create Demand</h1>
      <CreateDemandForm />
    </div>
  );
};

export default DemandsView;
