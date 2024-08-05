import { SetStateAction } from 'jotai'
import { SetAtom } from '../../types/jotai'
import Shape from '../../types/shape'

const shapeTransfer = (
    targetShape: Shape,
    from: number,
    to: number,
    innerPlayerSetters: SetAtom<[SetStateAction<Shape | null>], void>[],
    innerSetters: SetAtom<[SetStateAction<Shape[]>], void>[],
    setShadowRemoval: SetAtom<[SetStateAction<(Shape | null)[][]>], void>,
    innerStatue: Shape[]
) => {
    // remove just one targetShape from innerShapes[from]
    // If there is two same shapes, remove one of them
    innerSetters[from](prev => {
        const index = prev.findIndex(shape => shape === targetShape)
        if (index === -1) return prev
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })

    // If targetShape is in shadow[to], then change it to null
    setShadowRemoval(prev => {
        if (targetShape === innerStatue[to]) {
            return prev
        }
        const shadow = prev[to]
        const index = shadow.findIndex(shape => shape === targetShape)
        if (index === -1) return prev
        return [
            ...prev.slice(0, to),
            [...shadow.slice(0, index), null, ...shadow.slice(index + 1)],
            ...prev.slice(to + 1),
        ]
    })

    // add targetShape to innerShapes[to]
    innerSetters[to](prev => [...prev, targetShape])

    // remove player shape
    innerPlayerSetters[from](null)
}

export default shapeTransfer
