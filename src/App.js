import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import DepositWithdraw from './pages/DepositWithdraw';
import Transfer from './pages/Transfer';
import Nominee from './pages/Nominee';
import { WalletProvider } from './WalletContext';
import BackgroundPigs from './components/BackgroundPigs';
import './App.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="/piglet-logo.jpeg" alt="Piglet Logo" className="logo" />
        <h1>Piglet</h1>
      </div>
      <div className="navbar-nav">
        <Link to="/">Home</Link>
        <Link to="/deposit-withdraw">Deposit/Withdraw</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/nominee">Nominee</Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <WalletProvider>
      <Router>
        <div className="background">
          <BackgroundPigs counts={[2, 1, 3]} size={100} /> {/* Adjust counts and size as needed */}
        </div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deposit-withdraw" element={<DepositWithdraw />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/nominee" element={<Nominee />} />
          </Routes>
        </div>
        <div className="footer">
          &copy; 2024 Piglet. All rights reserved.
        </div>
      </Router>
    </WalletProvider>
  );
};

export default App;
