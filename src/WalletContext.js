import React, { createContext, useState, useEffect, useCallback } from 'react';
import { contractAddress, abi } from './utils/contract';
const ethers = require("ethers");

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletConnected(true);
      setAddress(accounts[0]);
      getBalance(accounts[0]);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setAddress('');
    setBalance('');
  };

  const getBalance = useCallback(async (addr = address) => {
    try {
      if (window.ethereum && addr) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const piggyBankContract = new ethers.Contract(contractAddress, abi, signer);
        const contractBalance = await piggyBankContract.getBalance(addr);
        setBalance(ethers.formatEther(contractBalance));
      }
    } catch (err) {
      console.error("Failed to fetch balance from contract", err);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      getBalance();
    }
  }, [address, getBalance]);

  return (
    <WalletContext.Provider value={{
      walletConnected,
      address,
      balance,
      connectWallet,
      disconnectWallet,
      getBalance,
    }}>
      {children}
    </WalletContext.Provider>
  );
};
