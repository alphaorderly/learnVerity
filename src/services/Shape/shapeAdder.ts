/* eslint-disable import/prefer-default-export */
import Shape from '../../types/shape'

export const shapeAdder = (
    currentShape: Shape | null,
    newShape: Shape
): Shape => {
    if (currentShape === null) {
        return newShape
    }

    switch (currentShape) {
        case Shape.Circle:
            if (newShape === Shape.Circle) {
                return Shape.Sphere
            }
            if (newShape === Shape.Square) {
                return Shape.Cylinder
            }
            if (newShape === Shape.Triangle) {
                return Shape.Cone
            }
            break
        case Shape.Square:
            if (newShape === Shape.Circle) {
                return Shape.Cylinder
            }
            if (newShape === Shape.Square) {
                return Shape.Cube
            }
            if (newShape === Shape.Triangle) {
                return Shape.Prism
            }
            break
        case Shape.Triangle:
            if (newShape === Shape.Circle) {
                return Shape.Cone
            }
            if (newShape === Shape.Square) {
                return Shape.Prism
            }
            if (newShape === Shape.Triangle) {
                return Shape.Pyramid
            }
            break
        default:
            return Shape.Circle
    }

    return Shape.Circle
}
