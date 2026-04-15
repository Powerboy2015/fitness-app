// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
    future: {
        hoverOnlyWhenSupported: true, // Prevents "sticky" hover on mobile
    },
    content: ["./index.html", "./src/**/*.{ts,tsx}"],

    theme: {
        extend: {
            colors: {
            },
        },
    },

    plugins: [],
} satisfies Config;


