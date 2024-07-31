import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Shape from '../../types/shape'
import TriangleShadow from './TriangleShadow'
import SquareShadow from './SquareShadow'
import CircleShadow from './CircleShadow'
import WeirdShadow from './WeirdShadow'

const renderShape = (shape: Shape | 'Weird') => {
    switch (shape) {
        case Shape.Triangle:
            return <TriangleShadow />
        case Shape.Square:
            return <SquareShadow />
        case Shape.Circle:
            return <CircleShadow />
        case 'Weird':
        default:
            return <WeirdShadow />
    }
}

const BackShadow: React.FC<{ shapes: Shape[] }> = ({ shapes }) => {
    const [currentShape, setCurrentShape] = useState<Shape | 'Weird'>(
        shapes[0] || 'Weird'
    )
    const [, setIsAnimating] = useState<boolean>(false)

    useEffect(() => {
        if (shapes.length < 1) return

        let currentIndex = 0
        const interval = setInterval(() => {
            setIsAnimating(true)
            const nextIndex = (currentIndex + 1) % shapes.length
            setCurrentShape(shapes[nextIndex])
            currentIndex = nextIndex

            setTimeout(() => {
                setIsAnimating(false)
            }, 500) // Transition duration of 0.5s
        }, 2000) // 1.5s visible + 0.5s transition = 2s interval

        return () => clearInterval(interval)
    }, [shapes])

    return (
        <AnimatePresence>
            <div className="relative size-24">{renderShape(currentShape)}</div>
        </AnimatePresence>
    )
}

export default BackShadow
