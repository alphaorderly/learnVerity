import Shape from '../../types/shape'

const successChecker = (
    userShape: Shape,
    currentShape: Shape | null
): boolean => {
    if (currentShape === null) {
        return false
    }
    switch (userShape) {
        case Shape.Circle:
            return currentShape === Shape.Prism
        case Shape.Square:
            return currentShape === Shape.Cone
        case Shape.Triangle:
            return currentShape === Shape.Cylinder
        default:
            return false
    }
}

export default successChecker
