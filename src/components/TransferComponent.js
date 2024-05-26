import React, { useState } from "react";
import ReactDOM from "react-dom";
import { contractAddress, abi } from "../utils/contract";
import Swal from "sweetalert2";
import LottieAnimation from "./LottieAnimation";
import transferAnimation from "../animations/transfer.json";
const ethers = require("ethers");

const TransferComponent = ({  }) => {
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const handleTransfer = async () => {
    try {
      if (window.ethereum && transferAddress && transferAmount) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const amount = ethers.parseEther(transferAmount);
        const tx = await contract.transfer(transferAddress, amount);
        await tx.wait();

        setTransferAddress("");
        setTransferAmount("");
        Swal.fire({
          icon: "success",
          title: `Transfer Successful!`,
          text: `You transferred ${transferAmount} ETH`,
          showConfirmButton: true,
          timer: 5000,
          didOpen: () => {
            const swalContainer = Swal.getHtmlContainer();
            const animationElement = document.createElement("div");
            swalContainer.appendChild(animationElement);
            const root = ReactDOM.createRoot(animationElement);
            root.render(
              <LottieAnimation animationData={transferAnimation} />,
              animationElement
            );
          },
        });
      }
    } catch (err) {
      if (err.code === "ACTION_REJECTED" || err.code === 4001) {
        Swal.fire({
          icon: "error",
          title: "Action Rejected",
          text: "You rejected the transaction",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Transfer",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter transfer address"
          value={transferAddress}
          onChange={(e) => setTransferAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter transfer amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button className="button-primary" onClick={handleTransfer}>
          Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferComponent;
