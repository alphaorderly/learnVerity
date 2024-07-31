import React from 'react'
import { motion } from 'framer-motion'

const TriangleShadow: React.FC = () => (
    <motion.svg
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="size-full"
        viewBox="0 0 100 100"
    >
        <polygon
            points="50,15 90,85 10,85"
            className="fill-current text-black"
        />
    </motion.svg>
)

export default TriangleShadow
