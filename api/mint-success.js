export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({
            "fc:frame": {
                "version": "vNext",
                "image": "https://i.imgur.com/5lAUjyc.webp",
                "buttons": [
                    {
                        "label": "Back to Home",
                        "action": "post",
                        "target": "https://nft-mint-topaz.vercel.app/"
                    }
                ],
                "post_url": "https://nft-mint-topaz.vercel.app/"
            },
            "message": "Mint successful!"
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}