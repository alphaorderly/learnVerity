import { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { Vector3 } from 'three'

type shapeProps = {
    size: string
}

export const Circle: FC<shapeProps> = ({ size }) => (
    <div className="flex items-center justify-center rounded-full">
        <div
            className="rounded-full bg-gray-800"
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
            className="bg-gray-800"
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
            className="border-transparent border-b-gray-800"
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

export const Sphere: FC<shapeProps> = ({ size }) => {
    const springs = useSpring({
        scale: [1, 1, 1] as unknown as Vector3,
        from: { scale: [0, 0, 0] as unknown as Vector3 },
        config: { mass: 1, tension: 280, friction: 20 },
    })

    return (
        <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 15 }}>
                <ambientLight intensity={1.2} />
                <directionalLight
                    position={[15, 15, 15]}
                    intensity={1.5}
                    castShadow
                />
                <directionalLight position={[-15, -15, -15]} intensity={0.8} />
                <pointLight
                    position={[8, 8, 0]}
                    intensity={0.8}
                    distance={25}
                    decay={1.5}
                />
                <pointLight
                    position={[-8, -8, 0]}
                    intensity={0.6}
                    distance={25}
                    decay={1.5}
                />
                <animated.mesh scale={springs.scale}>
                    <sphereGeometry args={[2.5, 64, 64]} />
                    <meshStandardMaterial
                        color="#707070"
                        metalness={0.1}
                        roughness={0.35}
                    />
                </animated.mesh>
            </Canvas>
        </div>
    )
}

export const Cube: FC<shapeProps> = ({ size }) => {
    const springs = useSpring({
        scale: [1, 1, 1] as unknown as Vector3,
        from: { scale: [0, 0, 0] as unknown as Vector3 },
        config: { mass: 1, tension: 280, friction: 20 },
    })

    return (
        <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{
                    position: [0, 0, 15],
                    fov: 15, // FOV를 더 줄여서 원근감 최소화
                }}
            >
                <ambientLight intensity={1.3} />
                <directionalLight
                    position={[15, 15, 15]}
                    intensity={1.2}
                    castShadow
                />
                <directionalLight position={[-15, -15, -15]} intensity={0.7} />
                <pointLight
                    position={[8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <animated.mesh
                    scale={springs.scale}
                    rotation={[0.615, -0.785, 0]}
                    position={[0.2, 0.2, 0]}
                >
                    <boxGeometry args={[2.3, 2.3, 2.3]} />
                    <meshStandardMaterial
                        attach="material-0"
                        color="#909090"
                        metalness={0.1}
                        roughness={0.35}
                    />
                    <meshStandardMaterial
                        attach="material-1"
                        color="#606060"
                        metalness={0.1}
                        roughness={0.35}
                    />
                    <meshStandardMaterial
                        attach="material-2"
                        color="#808080"
                        metalness={0.1}
                        roughness={0.35}
                    />
                    <meshStandardMaterial
                        attach="material-3"
                        color="#707070"
                        metalness={0.1}
                        roughness={0.35}
                    />
                    <meshStandardMaterial
                        attach="material-4"
                        color="#858585"
                        metalness={0.1}
                        roughness={0.35}
                    />
                    <meshStandardMaterial
                        attach="material-5"
                        color="#757575"
                        metalness={0.1}
                        roughness={0.35}
                    />
                </animated.mesh>
            </Canvas>
        </div>
    )
}

export const Pyramid: FC<shapeProps> = ({ size }) => {
    const springs = useSpring({
        scale: [1, 1, 1] as unknown as Vector3,
        from: { scale: [0, 0, 0] as unknown as Vector3 },
        config: { mass: 1, tension: 280, friction: 20 },
    })

    return (
        <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{
                    position: [0, 10, 12],
                    fov: 15,
                }}
            >
                <ambientLight intensity={1.3} />
                <directionalLight
                    position={[15, 15, 15]}
                    intensity={1.2}
                    castShadow
                />
                <directionalLight position={[-15, -15, -15]} intensity={0.7} />
                <pointLight
                    position={[8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <animated.mesh
                    scale={springs.scale}
                    rotation={[0.615, -0.785, 0]}
                    position={[0.2, 0.2, 0]}
                >
                    <tetrahedronGeometry args={[2]} />
                    <meshStandardMaterial
                        color="#808080"
                        metalness={0.1}
                        roughness={0.35}
                    />
                </animated.mesh>
            </Canvas>
        </div>
    )
}

export const Cylinder: FC<shapeProps> = ({ size }) => {
    const springs = useSpring({
        scale: [1, 1, 1] as unknown as Vector3,
        from: { scale: [0, 0, 0] as unknown as Vector3 },
        config: { mass: 1, tension: 280, friction: 20 },
    })

    return (
        <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{
                    position: [0, 0, 16],
                    fov: 15,
                }}
            >
                <ambientLight intensity={1.3} />
                <directionalLight
                    position={[15, 15, 15]}
                    intensity={1.2}
                    castShadow
                />
                <directionalLight position={[-15, -15, -15]} intensity={0.7} />
                <pointLight
                    position={[8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <animated.mesh
                    scale={springs.scale}
                    rotation={[0.615, -0.785, 0]}
                    position={[0.2, 0.2, 0]}
                >
                    <cylinderGeometry args={[1.5, 1.5, 2.5, 32]} />
                    <meshStandardMaterial
                        color="#808080"
                        metalness={0.1}
                        roughness={0.35}
                    />
                </animated.mesh>
            </Canvas>
        </div>
    )
}

export const Cone: FC<shapeProps> = ({ size }) => {
    const springs = useSpring({
        scale: [1, 1, 1] as unknown as Vector3,
        from: { scale: [0, 0, 0] as unknown as Vector3 },
        config: { mass: 1, tension: 280, friction: 20 },
    })

    return (
        <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{
                    position: [0, 0, 15],
                    fov: 15,
                }}
            >
                <ambientLight intensity={1.3} />
                <directionalLight
                    position={[12, 15, 15]}
                    intensity={1.2}
                    castShadow
                />
                <directionalLight position={[-15, -15, -15]} intensity={0.7} />
                <pointLight
                    position={[8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <animated.mesh
                    scale={springs.scale}
                    rotation={[0.615, -0.785, 0]}
                    position={[0, 0.2, 0]}
                >
                    <coneGeometry args={[1.5, 2.8, 32]} />
                    <meshStandardMaterial
                        color="#808080"
                        metalness={0.1}
                        roughness={0.35}
                    />
                </animated.mesh>
            </Canvas>
        </div>
    )
}

export const Prism: FC<shapeProps> = ({ size }) => {
    const springs = useSpring({
        scale: [1, 1, 1] as unknown as Vector3,
        from: { scale: [0, 0, 0] as unknown as Vector3 },
        config: { mass: 1, tension: 280, friction: 20 },
    })

    return (
        <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{
                    position: [0, 0, 15],
                    fov: 15,
                }}
            >
                <ambientLight intensity={1.3} />
                <directionalLight
                    position={[15, 15, 15]}
                    intensity={1.2}
                    castShadow
                />
                <directionalLight position={[-15, -15, -15]} intensity={0.7} />
                <pointLight
                    position={[8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, 2]}
                    intensity={0.4}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[-8, 8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <pointLight
                    position={[0, -8, -2]}
                    intensity={0.35}
                    distance={30}
                    decay={1.8}
                />
                <animated.mesh
                    scale={springs.scale}
                    rotation={[0.615, -0.785, 0]}
                    position={[0, 0.2, 0]}
                >
                    <cylinderGeometry args={[1.5, 1.5, 2.5, 3]} />
                    <meshStandardMaterial
                        color="#808080"
                        metalness={0.1}
                        roughness={0.35}
                    />
                </animated.mesh>
            </Canvas>
        </div>
    )
}
