import { SetStateAction, useAtom, useAtomValue } from 'jotai'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Shape from '../../types/shape'
import BackShadow from '../../components/Shadow/BackShadow'
import { SetAtom } from '../../types/jotai'
import { shapeAdder } from '../../services/Shape/shapeAdder'
import { threeD, useShapeTranslate } from '../../hooks/useShapeTranslate'
import PlayerStatue from '../../components/Statue/PlayerStatue'
import { innerShadowRemoval, innerStatue } from '../../states/inner-states'
import shapeTransfer from '../../services/Shape/shapeTransfer'
import shuffleArray from '../../utils/shuffle/shuffleArray'
import successChecker from '../../services/Shape/successChecker'
import hiveKnight from '../../assets/hive-knight.jpg'
import ogreImage from '../../assets/ogre.jpg'

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
    const { t } = useTranslation()
    const { translate } = useShapeTranslate()

    const playerNames = ['A', 'B', 'C']

    // Ogre is catched
    const [ogre, setOgre] = useState<boolean>(false)

    const [knight, setKnight] = useState<Shape[]>([])
    const [catched, setCatched] = useState<boolean[]>([])
    const [gotShape, setGotShape] = useState<boolean[]>([])

    const [action, setAction] = useState<boolean>(false)

    const [shadow, setShadow] = useAtom(innerShadowRemoval)
    const innerStatues = useAtomValue(innerStatue)

    const doSomething = () => {
        setAction(prev => !prev)
    }

    const successed = successChecker(
        index,
        innerStatues[index],
        innerPlayers[index],
        shadow
    )

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
        Circle: '⚫️',
        Square: '⬛️',
        Triangle: '▲',
    }

    return (
        <div className="flex flex-1 flex-col items-center">
            <div className="mt-10 text-5xl font-black text-gray-800">
                {successed ? t('success') : t('trying')}
            </div>

            <div className="my-8 flex justify-center text-center">
                <span className="rounded-lg bg-gray-50 px-6 py-2 text-4xl font-medium text-gray-700 shadow-sm">
                    {t('username', { username: playerNames[index] })}
                </span>
            </div>

            <div className="text-center">
                <span className="rounded-md bg-white px-4 py-2 text-2xl text-gray-600 shadow-sm">
                    {t('usershape')} : {translate(innerPlayers[index])}
                </span>
            </div>

            <div className="my-10">
                <BackShadow shapes={innerShapes[index]} />
            </div>

            <div className="my-10 flex select-none gap-10">
                {knight.map((shape, i) => (
                    <div
                        key={shape + playerNames[i]}
                        className="m-2 flex size-16 cursor-pointer items-center justify-center rounded-lg bg-white text-2xl shadow-sm transition-colors hover:bg-gray-50"
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
                        {catched[i] ? null : (
                            <div className="flex flex-col items-center">
                                <img
                                    src={hiveKnight}
                                    alt="knight"
                                    className="size-24 rounded-md object-cover"
                                />
                                <span className="mt-1 text-base font-medium text-gray-700">
                                    {t('knight')}
                                </span>
                            </div>
                        )}
                        {catched[i] && !gotShape[i] ? (
                            <span className="transition-transform hover:scale-110">
                                {shapes[shape]}
                            </span>
                        ) : null}
                    </div>
                ))}
            </div>

            <div>
                {!ogre && catched.every(c => c) ? (
                    <div
                        className="m-2 mt-10 flex size-16 cursor-pointer items-center justify-center rounded-lg bg-white text-2xl shadow-sm transition-colors hover:bg-gray-50"
                        onClick={() => {
                            setOgre(true)
                            doSomething()
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={ogreImage}
                                alt="ogre"
                                className="h-24 w-48 rounded-md object-cover"
                            />
                            <span className="mt-1 text-base font-medium text-gray-700">
                                {t('ogre')}
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="flex gap-10">
                {innerStatues.map((shape, i) => (
                    <div
                        key={shape + playerNames[i]}
                        className="relative cursor-pointer transition-transform hover:scale-105"
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
                                innerSetters,
                                setShadow,
                                innerStatues
                            )
                        }}
                    >
                        <PlayerStatue
                            shape={shadow[index][i]}
                            key={shape + playerNames[i]}
                            name={playerNames[i]}
                            bold={index === i}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InnerSingle
