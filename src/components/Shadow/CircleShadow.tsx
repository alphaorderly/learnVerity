import React from 'react'
import { motion } from 'framer-motion'

const CircleShadow: React.FC = () => (
    <motion.svg
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="size-full"
        viewBox="0 0 100 100"
    >
        <circle cx="50" cy="50" r="40" className="fill-current text-black" />
    </motion.svg>
)

export default CircleShadow
