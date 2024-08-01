import React from 'react'
import { motion } from 'framer-motion'

const SquareShadow: React.FC = () => (
    <motion.svg
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="size-full"
        viewBox="0 0 100 100"
    >
        <rect
            x="10"
            y="10"
            width="80"
            height="80"
            className="fill-current text-black"
        />
    </motion.svg>
)

export default SquareShadow
