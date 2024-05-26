// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiUserPiggyBank {
    struct User {
        uint256 balance;
        address nominee;
    }

    mapping(address => User) private users;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event NomineeAdded(address indexed user, address indexed nominee);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Deposit ETH to the user's piggybank
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        users[msg.sender].balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Withdraw ETH from the user's piggybank
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(users[msg.sender].balance >= amount, "Insufficient balance");

        users[msg.sender].balance -= amount;
        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

    // Add a nominee to the user's piggybank
    function addNominee(address _nominee) public {
        require(_nominee != address(0), "Invalid nominee address");
        users[msg.sender].nominee = _nominee;
        emit NomineeAdded(msg.sender, _nominee);
    }

    // Transfer amount from one user's piggybank to another user's piggybank
    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Transfer amount must be greater than zero");
        require(users[msg.sender].balance >= amount, "Insufficient balance");

        users[msg.sender].balance -= amount;
        users[to].balance += amount;

        emit Transfer(msg.sender, to, amount);
    }

    // Get the balance of the user
    function getBalance(address user) public view returns (uint256) {
        return users[user].balance;
    }

    // Get the nominee of the user
    function getNominee(address user) public view returns (address) {
        return users[user].nominee;
    }

    // Function to allow nominee to withdraw in case of an emergency
    function emergencyWithdraw(address user) public {
        require(msg.sender == users[user].nominee, "Only the nominee can perform emergency withdrawal");
        uint256 amount = users[user].balance;
        require(amount > 0, "No balance to withdraw");

        users[user].balance = 0;
        payable(msg.sender).transfer(amount);

        emit Withdrawal(user, amount);
    }
}
