export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({
            "fc:frame": {
                "version": "vNext",
                "image": "https://i.imgur.com/5lAUjyc.webp",
                "buttons": [
                    {
                        "label": "Connect Wallet & Mint",
                        "action": "post",
                        "target": "https://nft-mint-topaz.vercel.app/api/mint"
                    },
                    {
                        "label": "Back",
                        "action": "post",
                        "target": "https://nft-mint-topaz.vercel.app/"
                    }
                ],
                "post_url": "https://nft-mint-topaz.vercel.app/api/mint"
            },
            "message": "Please connect your wallet to mint!"
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}