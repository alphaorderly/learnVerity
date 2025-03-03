import { SetStateAction, useAtom, useAtomValue } from 'jotai'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Award, User, Shapes, Sword, Shield } from 'lucide-react'
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
    playerNames: string[]
    think: boolean
}

const InnerSingle: FC<InnerSingleProps> = ({
    index,
    innerPlayers,
    innerPlayersSetters,
    innerSetters,
    innerShapes,
    playerNames,
    think,
}) => {
    const { t } = useTranslation()
    const { translate } = useShapeTranslate()

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

    const myPosition = ['position.left', 'position.middle', 'position.right']

    return (
        <div className="flex flex-1 flex-col items-center rounded-xl bg-gradient-to-b from-gray-50 to-white p-4">
            {/* Status Header */}
            <div className="mb-8 flex w-full flex-col items-center rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                    {successed ? (
                        <CheckCircle className="size-8 text-emerald-500" />
                    ) : (
                        <Award className="size-8 text-amber-500" />
                    )}
                    <h1 className="text-4xl font-black tracking-tight text-gray-800">
                        {successed ? t('success') : t('trying')}
                    </h1>
                </div>

                <div className="mb-4 flex items-center justify-center">
                    <span className="flex items-center gap-2 rounded-full bg-indigo-50 px-6 py-3 text-2xl font-medium text-indigo-700 shadow-sm ring-1 ring-indigo-100">
                        <User className="size-6" />
                        {t('username', { username: playerNames[index] })}
                    </span>
                </div>

                <div className="text-center">
                    <span className="flex items-center gap-2 rounded-md bg-gray-50 px-4 py-2 text-xl text-gray-600 shadow-sm">
                        <Shapes className="size-5 text-gray-500" />
                        {t('usershape')} : {translate(innerPlayers[index])}
                    </span>
                </div>
            </div>

            {/* Game Board */}
            <div className="my-6 rounded-lg bg-white p-4 shadow-md">
                <BackShadow shapes={innerShapes[index]} />
            </div>

            {/* Knights Section */}
            <div className="my-8 flex select-none gap-6">
                {knight.map((shape, i) => (
                    <div
                        key={shape + playerNames[i]}
                        className="group relative m-2 flex size-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-white shadow-md"
                        onClick={() => {
                            if (
                                innerPlayers[index] !== null &&
                                threeD.includes(innerPlayers[index])
                            ) {
                                return
                            }

                            if (!catched[i]) {
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
                            <div className="flex size-full flex-col items-center justify-center p-2">
                                <div className="relative size-20 overflow-hidden rounded-lg">
                                    <img
                                        src={hiveKnight}
                                        alt="knight"
                                        className="size-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                                <span className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-700">
                                    <Sword className="size-3" />
                                    {t('knight')}
                                </span>
                            </div>
                        )}
                        {catched[i] && !gotShape[i] ? (
                            <div className="flex size-full items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
                                <span className="text-4xl">
                                    {shapes[shape]}
                                </span>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            {/* Ogre Section */}
            <div className="my-4">
                {!ogre && catched.every(c => c) ? (
                    <div
                        className="group relative m-2 flex h-40 w-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-white shadow-md"
                        onClick={() => {
                            setOgre(true)
                            doSomething()
                        }}
                    >
                        <div className="relative h-32 w-full overflow-hidden">
                            <img
                                src={ogreImage}
                                alt="ogre"
                                className="size-full object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <span className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-700">
                            <Shield className="size-3" />
                            {t('ogre')}
                        </span>
                    </div>
                ) : null}
            </div>

            {/* Statues Section */}
            <div className="mt-8 flex gap-10">
                {innerStatues.map((shape, i) => (
                    <div
                        key={shape + playerNames[i]}
                        className="relative cursor-pointer"
                        style={{
                            top: i === 1 ? '50px' : '0px',
                        }}
                        onClick={() => {
                            const from = index
                            const to = i
                            if (from === to) {
                                return
                            }
                            if (innerPlayers[from] === null) {
                                return
                            }
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
                        <div className="rounded-lg transition-all">
                            <PlayerStatue
                                shape={shadow[index][i]}
                                key={shape + playerNames[i]}
                                name={playerNames[i]}
                                bold={index === i}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {think && (
                <div className="relative top-32 text-lg font-medium text-gray-600">
                    {t('statue.hint', {
                        position: t(myPosition[index]),
                        shape: translate(innerStatues[index]),
                    })}
                </div>
            )}
        </div>
    )
}

export default InnerSingle
