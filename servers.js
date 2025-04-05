const express = require('express');
const app = express();

// تنظیم CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// سرو کردن فایل‌های استاتیک
app.use(express.static('.'));

// هندل کردن درخواست‌های Warpcast
app.post('/mint', (req, res) => {
    console.log('Mint request received from Warpcast:', req.body);
    res.json({
        message: "NFT minted successfully!"
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));