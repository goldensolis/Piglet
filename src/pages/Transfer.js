import React, { useContext } from "react";
import TransferComponent from "../components/TransferComponent";
import { WalletContext } from "../WalletContext";

const Transfer = () => {
  const { balance } = useContext(WalletContext);

  return (
    <div className="card-container">
      <div className="card">
        <h2>Transfer</h2>
        <p>Piglet Balance: {balance} ETH</p>
        <TransferComponent />
      </div>
    </div>
  );
};

export default Transfer;
