import React, { FC } from 'react'

type shapeProps = {
    size: string
}

export const Circle: FC<shapeProps> = ({ size }) => (
    <div className="flex items-center justify-center rounded-full">
        <div
            className="rounded-full bg-black"
            style={{
                width: size,
                height: size,
            }}
        />
    </div>
)

export const Square: FC<shapeProps> = ({ size }) => (
    <div className="flex items-center justify-center">
        <div
            className="bg-black"
            style={{
                width: size,
                height: size,
            }}
        />
    </div>
)

export const Triangle: FC<shapeProps> = ({ size }) => (
    <div className="flex items-center justify-center">
        <div
            className="border-transparent border-b-black"
            style={{
                width: '0',
                height: '0',
                borderLeftWidth: `calc(${size} / 1.7)`,
                borderBottomWidth: `calc(${size})`,
                borderRightWidth: `calc(${size} / 1.7)`,
            }}
        />
    </div>
)

export const Sphere: FC<shapeProps> = ({ size }) => (
    <div className="flex items-center justify-center">
        <div
            className="relative rounded-full"
            style={{
                width: `calc(${size})`,
                height: `calc(${size})`,
                background: `radial-gradient(circle at 50% 40%, #ffffff, #cccccc, #000000)`,
                boxShadow: `0 10px 20px rgba(0, 0, 0, 0.5), inset -10px -10px 20px rgba(0, 0, 0, 0.25)`,
            }}
        />
    </div>
)

export const Cube: FC<shapeProps> = ({ size }) => {
    const faceSize = `calc(${size} / 1.4)` // Calculate face size
    const translationZ = `calc(${faceSize} / -2)`
    const translationY = `calc(${faceSize} / 1.47)` // (1 / sqrt(2)) * faceSize / 2

    return (
        <div
            className="relative -top-1 left-1 m-1"
            style={{ width: size, height: size, perspective: '800px' }}
        >
            {/* Top Face */}
            <div
                className="absolute bg-gray-400"
                style={{
                    width: faceSize,
                    height: faceSize,
                    transform: `rotateX(60deg) rotateZ(45deg)`,
                    transformOrigin: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }}
            />
            {/* Left Face */}
            <div
                className="absolute bg-gray-500"
                style={{
                    width: faceSize,
                    height: faceSize,
                    transform: `rotateY(-45deg) skewY(-20deg) translateY(${translationY}) translateZ(${translationZ})`,
                    transformOrigin: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }}
            />
            {/* Right Face */}
            <div
                className="absolute bg-gray-600"
                style={{
                    width: faceSize,
                    height: faceSize,
                    transform: `rotateY(45deg) skewY(20deg) translateY(${translationY}) translateZ(${translationZ})`,
                    transformOrigin: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }}
            />
        </div>
    )
}

export const Pyramid: FC<shapeProps> = ({ size }) => {
    const faceSize = `calc(${size} * 1.4)` // Adjusted face size for better visualization
    const translationZ = `calc(${faceSize} / -3.6)` // Fine-tuned for correct 3D alignment
    const translationY = `calc(${faceSize} / 2.75)` // Fine-tuned for better alignment

    return (
        <div
            className="relative -left-1 bottom-2"
            style={{ width: size, height: size, perspective: '800px' }}
        >
            {/* Left Face */}
            <div
                className="absolute"
                style={{
                    width: faceSize,
                    height: faceSize,
                    transform: `rotateY(-30deg) rotateX(-45deg) translateY(${translationY}) translateZ(${translationZ})`,
                    transformOrigin: 'center',
                    clipPath: 'polygon(45% 0%, 0% 100%, 50% 70%)', // Slightly adjusted triangular shape
                    background: 'linear-gradient(135deg, #b8b8b8, #7f8c8d)', // Slightly adjusted gradient for left face
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)', // Slightly reduced shadow for subtle effect
                }}
            />
            {/* Right Face */}
            <div
                className="absolute"
                style={{
                    width: faceSize,
                    height: faceSize,
                    transform: `rotateY(30deg) rotateX(-45deg) translateY(${translationY}) translateZ(${translationZ})`,
                    transformOrigin: 'center',
                    clipPath: 'polygon(55% 0%, 40% 70%, 91% 100%)', // Slightly adjusted triangular shape
                    background: 'linear-gradient(135deg, #dcdcdc, #b0b0b0)', // Slightly adjusted gradient for right face
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)', // Slightly reduced shadow for subtle effect
                }}
            />
        </div>
    )
}

export const Cylinder: FC<shapeProps> = ({ size }) => {
    const faceSize = `calc(${size} / 1.2)` // Diameter of the cylinder's top face
    const height = `calc(${size} / 1.4)` // Height of the cylinder
    const topEllipseHeight = faceSize // Height of the top ellipse

    return (
        <div
            className="relative left-[3px] m-1"
            style={{ width: size, height: size, perspective: '800px' }}
        >
            {/* Top Face */}
            <div
                className="absolute z-10 rounded-full"
                style={{
                    width: faceSize,
                    height: topEllipseHeight,
                    background: 'linear-gradient(145deg, #e0e0e0, #5c5c5c)', // Grayscale gradient
                    transform: `translateY(calc(${height} * -0.3)) rotateX(60deg)`,
                    transformOrigin: 'center',
                }}
            />
            {/* Curved Surface */}
            <div
                className="absolute"
                style={{
                    width: faceSize,
                    height,
                    background: 'linear-gradient(to bottom, #c0c0c0, #808080)', // Grayscale gradient
                    transform: `translateY(calc(${height} / 3.2))`,
                    transformOrigin: 'center',
                    borderBottomLeftRadius: '50% 30%',
                    borderBottomRightRadius: '50% 30%',
                }}
            />
        </div>
    )
}

export const Cone: FC<shapeProps> = ({ size }) => (
    <div
        className="relative m-1"
        style={{ width: size, height: size, perspective: '1000px' }}
    >
        {/* Cone surface */}
        <div
            className="absolute inset-0"
            style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background:
                    'linear-gradient(-45deg, rgba(80, 80, 80, 0.667) 0%, rgba(0,0,0,0) 90%, rgba(0,0,0,0.1) 100%)',
                transform: 'rotateX(5deg)',
                transformOrigin: 'bottom',
                borderBottomLeftRadius: '50% 60%',
                borderBottomRightRadius: '50% 60%',
            }}
        />
    </div>
)

export const Prism: FC<shapeProps> = ({ size }) => (
    <div
        className="relative m-1"
        style={{ width: size, height: size, perspective: '1000px' }}
    >
        {/* Front face */}
        <div
            className="absolute inset-0"
            style={{
                clipPath: 'polygon(100% 0%, 0% 0%, 50% 50%)',
                background: 'linear-gradient(to bottom, #d0d0d0, #2a2a2a)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            }}
        />
        {/* Left face */}
        <div
            className="absolute inset-0"
            style={{
                height: '90%',
                width: '50%',
                background: 'linear-gradient(135deg, #bab9b9, #1a1a1a)',
                transform: `translateY(calc(${size} / 4)) skewY(45deg)`,
                boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.3)',
            }}
        />
        {/* Right face */}
        <div
            className="absolute inset-0"
            style={{
                height: '90%',
                width: '50%',
                background: 'linear-gradient(225deg, #949393, #1a1a1a)',
                transform: `translateY(calc(${size} / 4)) translateX(calc(${size} / 2)) skewY(-45deg)`,
                boxShadow: 'inset 5px -5px 10px rgba(0,0,0,0.3)',
            }}
        />
    </div>
)
