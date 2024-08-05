import { useTranslation } from 'react-i18next'
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
export const useShapeTranslate = () => {
    const { t } = useTranslation()

    const translate = (shape: Shape | null) => {
        switch (shape) {
            case Shape.Circle:
                return t('Circle')
            case Shape.Square:
                return t('Square')
            case Shape.Triangle:
                return t('Triangle')
            case Shape.Sphere:
                return t('Sphere')
            case Shape.Cube:
                return t('Cube')
            case Shape.Pyramid:
                return t('Pyramid')
            case Shape.Cylinder:
                return t('Cylinder')
            case Shape.Cone:
                return t('Cone')
            case Shape.Prism:
                return t('Prism')
            case null:
                return t('Nothing')
            default:
                return t('Nothing')
        }
    }

    return { translate }
}
