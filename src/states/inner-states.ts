import { atom } from 'jotai'
import Shape from '../types/shape'

/** Shapes in inner */

export const innerLeftShapes = atom<Shape[]>([])

export const innerMiddleShapes = atom<Shape[]>([])

export const innerRightShapes = atom<Shape[]>([])

/** Shapes user has */

export const innerLeftPlayer = atom<Shape | null>(null)

export const innerMiddlePlayer = atom<Shape | null>(null)

export const innerRightPlayer = atom<Shape | null>(null)

/** Inner Statue */

export const innerStatue = atom<Shape[]>([])

/** Shadow Removal */
export const innerShadowRemoval = atom<(Shape | null)[][]>([])
