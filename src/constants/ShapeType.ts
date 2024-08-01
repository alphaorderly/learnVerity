import Shape from '../types/shape'

export const twoD = [Shape.Circle, Shape.Square, Shape.Triangle]

export const threeD = [
    Shape.Sphere,
    Shape.Cube,
    Shape.Pyramid,
    Shape.Cylinder,
    Shape.Cone,
    Shape.Prism,
]

// Translate shape to korean
export const translate = (shape: Shape | null): string => {
    switch (shape) {
        case Shape.Circle:
            return '원'
        case Shape.Square:
            return '사각형'
        case Shape.Triangle:
            return '삼각형'
        case Shape.Sphere:
            return '구'
        case Shape.Cube:
            return '정육면체'
        case Shape.Pyramid:
            return '피라미드'
        case Shape.Cylinder:
            return '원기둥'
        case Shape.Cone:
            return '원뿔'
        case Shape.Prism:
            return '프리즘'
        case null:
            return '없음'
        default:
            return '없음'
    }
}
