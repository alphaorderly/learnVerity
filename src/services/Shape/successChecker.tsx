import Shape from '../../types/shape'

const successChecker = (
    index: number,
    userShape: Shape,
    currentShape: Shape | null,
    shadowRemoval: (Shape | null)[][]
): boolean => {
    const userShadow = shadowRemoval[index]

    if (userShadow === undefined) {
        return false
    }

    const removedShadowLength = userShadow.filter(
        shape => shape === null
    ).length

    if (removedShadowLength < 2) {
        return false
    }

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

export const outsideSuccessChecker = (
    statues: [
        [Shape | null, Shape | null],
        [Shape | null, Shape | null],
        [Shape | null, Shape | null],
    ],
    call: Shape[]
): boolean => {
    if (
        statues[0].includes(call[0]) ||
        statues[1].includes(call[1]) ||
        statues[2].includes(call[2])
    ) {
        return false
    }

    return true
}
