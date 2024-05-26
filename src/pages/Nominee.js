import React from "react";
import NomineeComponent from "../components/NomineeComponent";

const Nominee = () => {
  return (
    <div className="card-container">
      <div className="card">
        <h2>Nominee</h2>
        <NomineeComponent />
      </div>
    </div>
  );
};

export default Nominee;
