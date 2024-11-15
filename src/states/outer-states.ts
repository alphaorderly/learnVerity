import { atom } from 'jotai'
import Shape from '../types/shape'

export const outerStatues = atom<
    [[Shape | null, Shape | null], [Shape | null, Shape | null], [Shape | null, Shape | null]]
>([
    [null, null],
    [null, null],
    [null, null],
])

export const outerPlayer = atom<Shape | null>(null)
