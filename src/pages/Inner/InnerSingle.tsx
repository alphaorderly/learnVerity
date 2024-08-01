import { SetStateAction, useAtomValue } from 'jotai'
import { FC, useEffect, useState } from 'react'
import Shape from '../../types/shape'
import BackShadow from '../../components/Shadow/BackShadow'
import { SetAtom } from '../../types/jotai'
import { shapeAdder } from '../../services/Shape/shapeAdder'
import { threeD, translate } from '../../constants/ShapeType'
import PlayerStatue from '../../components/Statue/PlayerStatue'
import { innerStatue } from '../../states/inner-states'
import shapeTransfer from '../../services/Shape/shapeTransfer'
import shuffleArray from '../../utils/shuffle/shuffleArray'

type InnerSingleProps = {
    index: number
    innerShapes: Shape[][]
    innerSetters: SetAtom<[SetStateAction<Shape[]>], void>[]
    innerPlayers: (Shape | null)[]
    innerPlayersSetters: SetAtom<[SetStateAction<Shape | null>], void>[]
}

const InnerSingle: FC<InnerSingleProps> = ({
    index,
    innerPlayers,
    innerPlayersSetters,
    innerSetters,
    innerShapes,
}) => {
    const playerNames = ['A', 'B', 'C']

    // Ogre is catched
    const [ogre, setOgre] = useState<boolean>(false)

    const [knight, setKnight] = useState<Shape[]>([])
    const [catched, setCatched] = useState<boolean[]>([])
    const [gotShape, setGotShape] = useState<boolean[]>([])

    const [action, setAction] = useState<boolean>(false)

    const innerStatues = useAtomValue(innerStatue)

    const doSomething = () => {
        setAction(prev => !prev)
    }

    useEffect(() => {
        if (
            (knight.length === 0 && catched.length === 0) ||
            (catched.every(c => c) && ogre)
        ) {
            // If knight is not set
            // If all knights are catched and ogre is catched
            setOgre(false)
            setKnight(shuffleArray(innerShapes[index].slice(0, 2)))
            setCatched(
                Array(Math.min(innerShapes[index].length, 2)).fill(false)
            )
            setGotShape(
                Array(Math.min(innerShapes[index].length, 2)).fill(false)
            )
        } else if (catched.every(c => c)) {
            setOgre(false)
        }
    }, [catched, index, innerShapes, knight.length, ogre, action])

    // string to unicode shape
    const shapes: Record<string, string> = {
        Circle: '⚪',
        Square: '⬛',
        Triangle: '△',
    }

    return (
        <div className="flex flex-1 flex-col items-center">
            <div className="my-8 flex justify-center text-4xl">
                유저 {playerNames[index]}가 도착한 내부
            </div>
            <div className="text-2xl">
                유저가 가진 도형 : {translate(innerPlayers[index])}
            </div>
            <BackShadow shapes={innerShapes[index]} />
            <div className="flex select-none">
                {knight.map((shape, i) => (
                    <div
                        className="m-2 flex size-16 items-center justify-center rounded-full border border-black bg-white text-2xl"
                        onClick={() => {
                            if (
                                innerPlayers[index] !== null &&
                                threeD.includes(innerPlayers[index])
                            ) {
                                // If shape is 3D, do nothing
                                return
                            }

                            if (!catched[i]) {
                                // If catched, change into shape
                                setCatched(prev => {
                                    const next = [...prev]
                                    next[i] = true
                                    return next
                                })
                            } else if (catched[i] && !gotShape[i]) {
                                setGotShape(prev => {
                                    const next = [...prev]
                                    next[i] = true
                                    return next
                                })

                                innerPlayersSetters[index](prev =>
                                    shapeAdder(prev, shape)
                                )
                            }
                            doSomething()
                        }}
                    >
                        {catched[i] ? null : '기사'}
                        {catched[i] && !gotShape[i] ? shapes[shape] : null}
                    </div>
                ))}
            </div>
            <div>
                {!ogre && catched.every(c => c) ? (
                    <div
                        className="m-2 flex size-16 items-center justify-center rounded-full border border-black bg-white text-2xl"
                        onClick={() => {
                            setOgre(true)
                            doSomething()
                        }}
                    >
                        오우거
                    </div>
                ) : null}
            </div>
            <div className="flex gap-10">
                {innerStatues.map((shape, i) => (
                    <div
                        key={shape + playerNames[i]}
                        className="relative"
                        style={{
                            top: i === 1 ? '50px' : '0px',
                        }}
                        onClick={() => {
                            const from = index
                            const to = i
                            // If from and to is same, do nothing
                            if (from === to) {
                                return
                            }
                            // if player does not have shape, do nothing
                            if (innerPlayers[from] === null) {
                                return
                            }
                            // if player has 3D shape, just remove it
                            if (threeD.includes(innerPlayers[from])) {
                                innerPlayersSetters[from](null)
                                return
                            }

                            shapeTransfer(
                                innerPlayers[from] as Shape,
                                from,
                                to,
                                innerPlayersSetters,
                                innerSetters
                            )
                        }}
                    >
                        <PlayerStatue
                            shape={shape}
                            key={shape + playerNames[i]}
                            name={playerNames[i]}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InnerSingle
