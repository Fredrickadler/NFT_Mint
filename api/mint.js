export default function handler(req, res) {
    if (req.method === 'POST') {
        // پاسخ ساده به Warpcast
        res.status(200).json({
            message: "Mint request received",
            redirect: "https://nft-mint-topaz.vercel.app/" // برمی‌گرده به صفحه اصلی
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}