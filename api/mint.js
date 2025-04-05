export default function handler(req, res) {
    if (req.method === 'POST') {
        // پاسخ فریم با همه فیلدهای ممکن
        res.status(200).json({
            "fc:frame": {
                "version": "vNext",
                "image": "https://i.imgur.com/5lAUjyc.webp",
                "buttons": [
                    {
                        "label": "Confirm Mint",
                        "action": "post",
                        "target": "https://nft-mint-topaz.vercel.app/api/mint-success"
                    },
                    {
                        "label": "Cancel",
                        "action": "post",
                        "target": "https://nft-mint-topaz.vercel.app/"
                    }
                ],
                "post_url": "https://nft-mint-topaz.vercel.app/api/mint-success"
            }
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}