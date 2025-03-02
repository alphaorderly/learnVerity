 
import { FC, useEffect, useMemo } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import InnerSingle from './InnerSingle'
import {
    innerLeftPlayer,
    innerLeftShapes,
    innerMiddlePlayer,
    innerMiddleShapes,
    innerRightPlayer,
    innerRightShapes,
    innerShadowRemoval,
    innerStatue,
} from '../../states/inner-states'
import Shape from '../../types/shape'
import shuffleArray from '../../utils/shuffle/shuffleArray'
import currentName from '../../consts/names'
import ToggleSwitch from '../../components/Toggle/ToggleSwitch'
import thinkAtom from '../../states/think'

const InnerStage: FC = () => {
    const { i18n, t } = useTranslation()

    const [leftInnerShapes, setLeftInnerShapes] = useAtom(innerLeftShapes)
    const [middleInnerShapes, setMiddleInnerShapes] = useAtom(innerMiddleShapes)
    const [rightInnerShapes, setRightInnerShapes] = useAtom(innerRightShapes)

    const [leftInnerPlayer, setLeftInnerPlayer] = useAtom(innerLeftPlayer)
    const [middleInnerPlayer, setMiddleInnerPlayer] = useAtom(innerMiddlePlayer)
    const [rightInnerPlayer, setRightInnerPlayer] = useAtom(innerRightPlayer)

    const [, setInnerStatueState] = useAtom(innerStatue)

    const innerShapes = [leftInnerShapes, middleInnerShapes, rightInnerShapes]
    const innerSetters = [
        setLeftInnerShapes,
        setMiddleInnerShapes,
        setRightInnerShapes,
    ]

    const innerPlayers = [leftInnerPlayer, middleInnerPlayer, rightInnerPlayer]
    const innerPlayersSetters = [
        setLeftInnerPlayer,
        setMiddleInnerPlayer,
        setRightInnerPlayer,
    ]

    const setShadowRemoval = useSetAtom(innerShadowRemoval)

    const [think, setThink] = useAtom(thinkAtom)

    const playerPosition = useMemo(() => shuffleArray([0, 1, 2]), [])

    const playerNames = useMemo(
        () => currentName(i18n.language),
        [i18n.language]
    )

    useEffect(() => {
        if (
            leftInnerShapes.length === 0 &&
            middleInnerShapes.length === 0 &&
            rightInnerShapes.length === 0
        ) {
            const wholeShapes = [
                Shape.Circle,
                Shape.Square,
                Shape.Triangle,
                Shape.Circle,
                Shape.Square,
                Shape.Triangle,
            ]

            const shuffled = shuffleArray(wholeShapes)

            setLeftInnerShapes(shuffled.slice(0, 2))
            setMiddleInnerShapes(shuffled.slice(2, 4))
            setRightInnerShapes(shuffled.slice(4, 6))

            setLeftInnerPlayer(null)
            setMiddleInnerPlayer(null)
            setRightInnerPlayer(null)

            // there are three shape left, middle, right
            // left should be one of leftInnerShapes, middle should be one of middleInnerShapes, right should be one of rightInnerShapes
            // But they should be different

            // All combinations can be chosen, data is 0 or 1
            const combination = shuffleArray([
                [0, 0, 0],
                [0, 0, 1],
                [0, 1, 0],
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 1],
                [1, 1, 0],
                [1, 1, 1],
            ])

            for (let i = 0; i < combination.length; i += 1) {
                const [left, middle, right] = combination[i]

                if (
                    shuffled[0 + left] !== shuffled[2 + middle] &&
                    shuffled[2 + middle] !== shuffled[4 + right] &&
                    shuffled[4 + right] !== shuffled[0 + left]
                ) {
                    setInnerStatueState([
                        shuffled[0 + left],
                        shuffled[2 + middle],
                        shuffled[4 + right],
                    ])
                    setShadowRemoval([
                        [
                            shuffled[0 + left],
                            shuffled[2 + middle],
                            shuffled[4 + right],
                        ],
                        [
                            shuffled[0 + left],
                            shuffled[2 + middle],
                            shuffled[4 + right],
                        ],
                        [
                            shuffled[0 + left],
                            shuffled[2 + middle],
                            shuffled[4 + right],
                        ],
                    ])

                    break
                }
            }
        }
    })

    return (
        <div className="min-h-screen">
            <div className="mb-8 flex flex-col items-center justify-center gap-3 px-8 pt-4">
                <span className="text-lg font-medium text-gray-700">
                    {think ? t('think.on') : t('think.off')}
                </span>
                <ToggleSwitch
                    value={think}
                    onChange={setThink}
                    size={32}
                    color="#6366f1"
                />
            </div>
            <div className="mx-auto max-w-[1920px] p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                    {playerPosition.map(position => (
                        <div className="rounded-2xl bg-white/50 p-6  transition-transform hover:scale-[1.02] lg:p-8">
                            <InnerSingle
                                index={position}
                                innerPlayers={innerPlayers}
                                innerPlayersSetters={innerPlayersSetters}
                                innerSetters={innerSetters}
                                innerShapes={innerShapes}
                                playerNames={playerNames}
                                think={think}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InnerStage
