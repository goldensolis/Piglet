import React, { useContext, useState } from 'react';
import { WalletContext } from '../WalletContext';
import { contractAddress, abi } from '../utils/contract';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import LottieAnimation from './LottieAnimation';
import depositAnimation from '../animations/deposit.json';
import withdrawAnimation from '../animations/withdraw.json';
const ethers = require("ethers");

const DepositWithdrawComponent = () => {
  const { balance, getBalance } = useContext(WalletContext);
  const [ethAmount, setEthAmount] = useState('');

  const handleDeposit = async () => {
    if (window.ethereum && ethAmount) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const piggyBankContract = new ethers.Contract(contractAddress, abi, signer);
        const depositAmount = ethers.parseEther(ethAmount);

        const tx = await piggyBankContract.deposit({ value: depositAmount });
        await tx.wait();

        Swal.fire({
          icon: 'success',
          title: 'Deposit Successful!',
          text: `${ethAmount} ETH has been deposited.`,
          showConfirmButton: true,
          timer: 5000,
          didOpen: () => {
            const swalContainer = Swal.getHtmlContainer();
            const animationElement = document.createElement('div');
            swalContainer.appendChild(animationElement);
            const root = ReactDOM.createRoot(animationElement);
            root.render(<LottieAnimation animationData={depositAnimation} />);
          },
        });

        setEthAmount('');
        await getBalance();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Deposit Failed',
          showConfirmButton: true,
        });
      }
    }
  };

  const handleWithdraw = async () => {
    if (window.ethereum && ethAmount) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const piggyBankContract = new ethers.Contract(contractAddress, abi, signer);
        const withdrawAmount = ethers.parseEther(ethAmount);

        const tx = await piggyBankContract.withdraw(withdrawAmount);
        await tx.wait();

        Swal.fire({
          icon: 'success',
          title: 'Withdraw Successful!',
          text: `${ethAmount} ETH has been withdrawn.`,
          showConfirmButton: true,
          timer: 5000,
          didOpen: () => {
            const swalContainer = Swal.getHtmlContainer();
            const animationElement = document.createElement('div');
            swalContainer.appendChild(animationElement);
            const root = ReactDOM.createRoot(animationElement);
            root.render(<LottieAnimation animationData={withdrawAnimation} />);
          },
        });

        setEthAmount('');
        await getBalance();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Withdraw Failed',
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Deposit/Withdraw</h2>
        <h3>Piglet Contract Balance: {balance} ETH</h3>
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder="Enter amount in ETH"
        />
        <button className="button-primary" onClick={handleDeposit}>
          Deposit
        </button>
        <button className="button-secondary" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default DepositWithdrawComponent;
