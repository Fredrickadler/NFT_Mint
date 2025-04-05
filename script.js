// آدرس قرارداد و ABI// آدرس قرارداد و ABI
const contractAddress = "0xe2ba182898141f19b4a7d739c715cd162d31766c";
const contractABI = [
    {
        "inputs": [{"name": "to", "type": "address"}],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

// متغیرها برای ethers
let provider;
let signer;
let contract;

// تابع برای اتصال به ولت
async function connectWallet() {
    try {
        document.getElementById('status').innerText = "Connecting to Warplet...";
        
        // شبیه‌سازی اتصال به Warplet
        setTimeout(() => {
            document.getElementById('status').innerText = "Warplet connected!";
            document.getElementById('mintButton').disabled = false;
            
            // شبیه‌سازی گرفتن تصویر پروفایل کاربر
            const profileCircle = document.querySelector('.profile-circle');
            profileCircle.style.backgroundImage = "url('https://example.com/user-profile.jpg')";
        }, 1000);
    } catch (error) {
        document.getElementById('status').innerText = "Error connecting to Warplet: " + error.message;
    }
}

// تابع برای مینت کردن NFT
async function mintNFT() {
    try {
        document.getElementById('status').innerText = "Minting your NFT...";
        setTimeout(() => {
            document.getElementById('status').innerText = "NFT minted successfully!";
        }, 2000);
    } catch (error) {
        document.getElementById('status').innerText = "Error minting NFT: " + error.message;
    }
}

// تابع برای ایجاد ستاره‌ها
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
    document.querySelector('.stars-background').appendChild(star);
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

setInterval(createStar, 500);