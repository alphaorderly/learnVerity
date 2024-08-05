import { FC } from 'react'
import Shape from '../../types/shape'
import {
    Circle,
    Cone,
    Cube,
    Cylinder,
    Prism,
    Pyramid,
    Sphere,
    Square,
    Triangle,
} from './Shapes'

type ShapeRenderProps = {
    shape: Shape | null
    size: string
}

const ShapeRender: FC<ShapeRenderProps> = ({ shape, size }) => {
    switch (shape) {
        case Shape.Circle:
            return <Circle size={size} />
        case Shape.Square:
            return <Square size={size} />
        case Shape.Triangle:
            return <Triangle size={size} />
        case Shape.Sphere:
            return <Sphere size={size} />
        case Shape.Cube:
            return <Cube size={size} />
        case Shape.Pyramid:
            return <Pyramid size={size} />
        case Shape.Cylinder:
            return <Cylinder size={size} />
        case Shape.Cone:
            return <Cone size={size} />
        case Shape.Prism:
            return <Prism size={size} />
        default:
            return null
    }
}

export default ShapeRender
