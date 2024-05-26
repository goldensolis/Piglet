import React, { useContext } from "react";
import DepositWithdrawComponent from "../components/DepositWithdrawComponent";
import { WalletContext } from "../WalletContext";

const DepositWithdraw = () => {
  const { balance } = useContext(WalletContext);

  return (
    <div className="card-container">
      <div className="card">
        <h2>Deposit/Withdraw</h2>
        <p>Piglet Balance: {balance} ETH</p>
        <DepositWithdrawComponent />
      </div>
    </div>
  );
};

export default DepositWithdraw;
