import React, { useState } from "react";
import ReactDOM from "react-dom";
import { contractAddress, abi } from "../utils/contract";
import Swal from "sweetalert2";
import LottieAnimation from "./LottieAnimation";
import nomineeAnimation from "../animations/nominee.json";
const ethers = require("ethers");

const NomineeComponent = () => {
  const [nomineeAddress, setNomineeAddress] = useState("");

  const handleAddNominee = async () => {
    try {
      if (window.ethereum && nomineeAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.addNominee(nomineeAddress);
        await tx.wait();

        setNomineeAddress("");
        Swal.fire({
          icon: "success",
          title: `Nominee Added!`,
          text: `Nominee ${nomineeAddress} has been added successfully.`,
          showConfirmButton: true,
          timer: 5000,
          didOpen: () => {
            const swalContainer = Swal.getHtmlContainer();
            const animationElement = document.createElement("div");
            swalContainer.appendChild(animationElement);
            const root = ReactDOM.createRoot(animationElement);
            root.render(<LottieAnimation animationData={nomineeAnimation} />);
          },
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Nominee",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter nominee address"
          value={nomineeAddress}
          onChange={(e) => setNomineeAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button className="button-secondary" onClick={handleAddNominee}>
          Add Nominee
        </button>
      </div>
    </div>
  );
};

export default NomineeComponent;
