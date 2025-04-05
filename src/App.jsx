import React, { useEffect } from 'react';
import { useAccount, useConnect, useWriteContract } from 'wagmi';
import './styles.css';

const contractAddress = "0xe2ba182898141f19b4a7d739c715cd162d31766c";
const contractABI = [
  {
    "inputs": [{"name": "to", "type": "address"}],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minted",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContract, data, error, isPending } = useWriteContract();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('warpcast') || window.location.pathname === '/mint') {
      if (!isConnected) {
        connect({ connector: connectors[0] });
      }
    }
  }, [isConnected, connect, connectors]);

  const handleMint = () => {
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'mint',
      args: [address],
      value: BigInt("10000000000000000") // 0.01 ETH
    });
  };

  const createStar = () => {
    const star = document.createElement('div');
    star.classList.add('star');
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    const size = Math.random() * 3 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = `${duration}s`;
    document.querySelector('.stars-background')?.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
  };

  useEffect(() => {
    const interval = setInterval(createStar, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stars-background">
      <div className="container">
        <div className="profile-section">
          {!isConnected ? (
            <button className="wallet-button" onClick={() => connect({ connector: connectors[0] })}>
              Connect Wallet
            </button>
          ) : (
            <span className="wallet-button">Connected: {address.slice(0, 6)}...</span>
          )}
          <div className="profile-circle" style={{ backgroundImage: isConnected ? "url('https://i.imgur.com/example-profile.jpg')" : "none" }}></div>
        </div>
        <div className="header">
          <img src="https://i.imgur.com/5lAUjyc.webp" alt="NFT Image" className="nft-image" />
          <h1>Cosmic Fragment</h1>
          <p className="nft-description">A unique piece of digital art, crafted with cosmic energy and rare stardust. Own a fragment of the universe!</p>
          <p className="nft-availability">Available: <span id="available">44 / 44</span></p>
        </div>
        <button
          className="mint-button"
          onClick={handleMint}
          disabled={!isConnected || isPending}
        >
          {isPending ? "Minting..." : "Mint Now"}
        </button>
        <p id="status">
          {error ? `Error: ${error.message}` : data ? "NFT minted successfully!" : "Ready"}
        </p>
      </div>
    </div>
  );
}

export default App;