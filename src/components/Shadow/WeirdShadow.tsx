import React from 'react'
import { motion } from 'framer-motion'

const WeirdShadow: React.FC = () => (
    <motion.svg
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 1 }}
        className="size-full"
        viewBox="0 0 100 100"
    >
        <path
            d="M10 20 L30 10 L50 20 L70 10 L90 20 L80 50 L90 80 L70 90 L50 80 L30 90 L10 80 L20 50 Z"
            className="fill-current text-black"
        />
    </motion.svg>
)

export default WeirdShadow
