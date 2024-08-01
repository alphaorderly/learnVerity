import React, { useEffect, useState } from 'react'
import Shape from '../../types/shape'
import TriangleShadow from './TriangleShadow'
import SquareShadow from './SquareShadow'
import CircleShadow from './CircleShadow'
import WeirdShadow from './WeirdShadow'

const renderShape = (shape: Shape | 'Weird', key: number) => {
    switch (shape) {
        case Shape.Triangle:
            return <TriangleShadow key={key} />
        case Shape.Square:
            return <SquareShadow key={key} />
        case Shape.Circle:
            return <CircleShadow key={key} />
        case 'Weird':
            return <WeirdShadow key={key} />
        default:
            return <WeirdShadow key={key} />
    }
}

const BackShadow: React.FC<{ shapes: Shape[] }> = ({ shapes }) => {
    const [currentShape, setCurrentShape] = useState<number>(0)

    useEffect(() => {
        if (shapes.length === 0) {
            return
        }

        const interval = setInterval(() => {
            setCurrentShape(prev => (prev + 1) % shapes.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [shapes.length, shapes])

    return (
        <div className="size-24">
            {shapes.length === 0 && renderShape('Weird', 0)}
            {shapes.length > 0 &&
                renderShape(shapes[currentShape], currentShape)}
        </div>
    )
}

export default BackShadow
