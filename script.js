// آدرس قرارداد و ABI
// این آدرس و ABI برای قرارداد NFTت هست که روی شبکه Base دیپلوی شده
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
// این متغیرها برای کار با کتابخونه ethers.js استفاده می‌شن
let provider;
let signer;
let contract;

// تابع برای اتصال به ولت (Warplet)
// فعلاً یه شبیه‌سازی ساده انجام دادم چون API دقیق Warplet رو ندارم
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
// این تابع هم فعلاً شبیه‌سازی شده چون API واقعی برای مینت ندارم
async function mintNFT() {
    try {
        document.getElementById('status').innerText = "Minting your NFT...";
        
        // شبیه‌سازی مینت NFT
        setTimeout(() => {
            document.getElementById('status').innerText = "NFT minted successfully!";
        }, 2000);
    } catch (error) {
        document.getElementById('status').innerText = "Error minting NFT: " + error.message;
    }
}

// تابع برای ایجاد ستاره‌ها توی بک‌گراند
// این تابع هر 500 میلی‌ثانیه یه ستاره جدید توی بک‌گراند ایجاد می‌کنه
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // موقعیت تصادفی برای ستاره
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    // اندازه تصادفی برای ستاره (بین 2 تا 5 پیکسل)
    const size = Math.random() * 3 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // مدت زمان انیمیشن تصادفی (بین 2 تا 4 ثانیه)
    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = `${duration}s`;
    
    // اضافه کردن ستاره به بک‌گراند
    document.querySelector('.stars-background').appendChild(star);
    
    // حذف ستاره بعد از اتمام انیمیشن
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// هر 500 میلی‌ثانیه یه ستاره جدید ایجاد کن
setInterval(createStar, 500);