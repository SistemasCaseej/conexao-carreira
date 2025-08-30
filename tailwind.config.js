/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {
            fontFamily: {
                epilogue: ['"Epilogue"', "sans-serif"],
            },
        },
        screens: {
            xs: "600px",
        },
    },
    plugins: [],
};

export default config;
