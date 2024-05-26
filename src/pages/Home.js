import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../WalletContext';
import { contractAddress, abi } from '../utils/contract';
const ethers = require("ethers");

const Home = () => {
  const { walletConnected, connectWallet, disconnectWallet, address, balance, getBalance } = useContext(WalletContext);
  const [totalLiquidity, setTotalLiquidity] = useState('0');
  const [nominee, setNominee] = useState('');

  useEffect(() => {
    const fetchContractInfo = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const liquidity = await provider.getBalance(contractAddress);
          setTotalLiquidity(ethers.formatEther(liquidity));

          if (walletConnected && address) {
            const signer = await provider.getSigner();
            const piggyBankContract = new ethers.Contract(contractAddress, abi, signer);
            const nomineeAddress = await piggyBankContract.getNominee(address);
            setNominee(nomineeAddress !== ethers.constants.AddressZero ? nomineeAddress : 'No nominee set');
            await getBalance();
          }
        }
      } catch (err) {
        console.error("Failed to fetch contract info", err);
      }
    }
    fetchContractInfo();
  }, [walletConnected, address, getBalance]);

  return (
    <div className="card-container">
      <div className="card">
        <h1>Welcome to Piglet</h1>
        {walletConnected ? (
          <>
            <button className="button-danger" onClick={disconnectWallet}>Disconnect</button>
            <h2>Your Balance: {balance} ETH</h2>
            <p>Your Address: {address}</p>
            <p>Nominee: {nominee}</p>
            <p>Total Liquidity: {totalLiquidity} ETH</p>
          </>
        ) : (
          <>
            <button className="button-primary" onClick={connectWallet}>Connect Wallet</button>
            <h2>Your Balance: --</h2>
            <p>Your Address: --</p>
            <p>Nominee: --</p>
            <p>Total Liquidity: --</p>
          </>
        )}
      </div>
      {walletConnected && (
        <div className="contract-info">
          <a href={`https://sepolia-blockscout.lisk.com/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">
            Contract Address: {contractAddress}
          </a>
          <p>Total Liquidity: {totalLiquidity} ETH</p>
        </div>
      )}
      <div className="ticker">
        <div className="ticker-item">Piglet is a decentralized piggy bank application on the blockchain.</div>
        <div className="ticker-item">With Piglet, users can deposit, withdraw, transfer, and nominate beneficiaries for their funds.</div>
        <div className="ticker-item">The application is secure, transparent, and accessible to anyone with a cryptocurrency wallet.</div>
      </div>
    </div>
  );
};

export default Home;
