import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Wallet for cards",
        short_name: "CardWallet",
        description: "My cards offline",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
        {
                src: '/wallet_logo.jpg',
                sizes: 'any',
                type: 'image/jpg',
                purpose: 'maskable',
            },
            {
                src: '/wallet_logo.jpg',
                sizes: 'any',
                type: 'image/jpg',
                purpose: 'any',
            },
        ],
    }
}