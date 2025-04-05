// آدرس قرارداد و ABI
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

// متغیرها برای ethers
let provider;
let signer;
let contract;

// تابع برای اتصال به والت (پشتیبانی از MetaMask و Warplet)
async function connectWallet() {
    const status = document.getElementById('status');
    try {
        // چک کردن والت‌های موجود
        let walletProvider = null;
        if (window.ethereum) {
            // MetaMask یا هر والت سازگار با Ethereum
            walletProvider = window.ethereum;
            status.innerText = "Connecting to MetaMask...";
        } else if (window.warplet) {
            // Warplet (فرضاً اینجوری تشخیص داده می‌شه)
            walletProvider = window.warplet;
            status.innerText = "Connecting to Warplet...";
        } else {
            status.innerText = "No wallet detected! Install MetaMask or Warplet.";
            return;
        }

        provider = new ethers.providers.Web3Provider(walletProvider);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();

        contract = new ethers.Contract(contractAddress, contractABI, signer);
        status.innerText = "Wallet connected!";
        document.getElementById('mintButton').disabled = false;

        // آپدیت پروفایل (فرضی)
        const profileCircle = document.querySelector('.profile-circle');
        profileCircle.style.backgroundImage = "url('https://i.imgur.com/example-profile.jpg')"; // تصویر واقعی بذار

        // آپدیت تعداد موجود
        const minted = await contract.minted();
        const totalSupply = await contract.totalSupply();
        document.getElementById('available').innerText = `${totalSupply.sub(minted).toString()} / ${totalSupply.toString()}`;
    } catch (error) {
        status.innerText = "Error connecting to wallet: " + error.message;
    }
}

// تابع برای مینت کردن NFT
async function mintNFT() {
    const status = document.getElementById('status');
    const availableSpan = document.getElementById('available');

    if (!signer || !contract) {
        status.innerText = "Please connect your wallet first!";
        return;
    }

    try {
        status.innerText = "Minting your NFT...";
        const tx = await contract.mint(await signer.getAddress(), { value: ethers.utils.parseEther("0.01") }); // فرضاً 0.01 ETH
        await tx.wait();

        // آپدیت تعداد موجود
        const minted = await contract.minted();
        const totalSupply = await contract.totalSupply();
        availableSpan.innerText = `${totalSupply.sub(minted).toString()} / ${totalSupply.toString()}`;
        status.innerText = "NFT minted successfully!";
    } catch (error) {
        status.innerText = "Error minting NFT: " + error.message;
    }
}

// تابع برای هندل کردن درخواست‌های Warpcast Frames
function handleWarpcastRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('warpcast') || window.location.pathname === '/mint') {
        document.getElementById('status').innerText = "Request received from Warpcast!";
        if (signer && contract) {
            mintNFT();
        } else {
            connectWallet().then(() => mintNFT());
        }
    }
}

// تابع برای ایجاد ستاره‌ها توی بک‌گراند
function createStar() {
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
    
    const starsBackground = document.querySelector('.stars-background');
    if (starsBackground) {
        starsBackground.appendChild(star);
    }
    
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// هر 500 میلی‌ثانیه یه ستاره جدید
setInterval(createStar, 500);

// موقع لود صفحه
window.onload = function() {
    handleWarpcastRequest();
};