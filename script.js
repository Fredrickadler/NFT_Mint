// آدرس قرارداد و ABI (اینجا یه ABI ساده فرض شده)
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

// تابع برای اتصال به کیف پول
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            document.getElementById('status').innerText = "Wallet connected!";
            document.getElementById('mintButton').disabled = false;
        } catch (error) {
            document.getElementById('status').innerText = "Error connecting wallet: " + error.message;
        }
    } else {
        document.getElementById('status').innerText = "Please install MetaMask!";
    }
}

// تابع برای مینت کردن NFT
async function mintNFT() {
    try {
        document.getElementById('status').innerText = "Minting your NFT...";
        const userAddress = await signer.getAddress();
        const tx = await contract.mint(userAddress, {
            value: ethers.utils.parseEther("0.01")
        });
        await tx.wait();
        document.getElementById('status').innerText = "NFT minted successfully!";
    } catch (error) {
        document.getElementById('status').innerText = "Error minting NFT: " + error.message;
    }
}

// تابع برای ایجاد ستاره‌ها
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // موقعیت تصادفی
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    // اندازه تصادفی
    const size = Math.random() * 3 + 2; // بین 2 تا 5 پیکسل
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // مدت زمان انیمیشن تصادفی
    const duration = Math.random() * 2 + 2; // بین 2 تا 4 ثانیه
    star.style.animationDuration = `${duration}s`;
    
    document.querySelector('.stars-background').appendChild(star);
    
    // حذف ستاره بعد از اتمام انیمیشن
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// هر 500 میلی‌ثانیه یه ستاره جدید ایجاد کن
setInterval(createStar, 500);