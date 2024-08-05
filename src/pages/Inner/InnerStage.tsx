import { FC, useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'
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

const InnerStage: FC = () => {
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
        <div className="flex flex-col justify-around gap-40 lg:flex-row lg:gap-0">
            <InnerSingle
                index={0}
                innerPlayers={innerPlayers}
                innerPlayersSetters={innerPlayersSetters}
                innerSetters={innerSetters}
                innerShapes={innerShapes}
            />
            <InnerSingle
                index={1}
                innerPlayers={innerPlayers}
                innerPlayersSetters={innerPlayersSetters}
                innerSetters={innerSetters}
                innerShapes={innerShapes}
            />
            <InnerSingle
                index={2}
                innerPlayers={innerPlayers}
                innerPlayersSetters={innerPlayersSetters}
                innerSetters={innerSetters}
                innerShapes={innerShapes}
            />
        </div>
    )
}

export default InnerStage
