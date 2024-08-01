/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%': { transform: 'translateX(-2px)' },
                    '20%, 40%, 60%': { transform: 'translateX(2px)' },
                    '80%': { transform: 'translateX(-1px)' },
                    '90%': { transform: 'translateX(1px)' },
                },
            },
            animation: {
                shake: 'shake 0.5s ease-in-out', // Define the shake animation
            },
        },
    },
    plugins: [],
}
