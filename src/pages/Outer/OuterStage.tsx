/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom, useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { innerStatue } from '../../states/inner-states'
import { outerPlayer, outerStatues } from '../../states/outer-states'
import Shape from '../../types/shape'
import shuffleArray from '../../utils/shuffle/shuffleArray'
import { threeD, useShapeTranslate } from '../../hooks/useShapeTranslate'
import PlayerStatue from '../../components/Statue/PlayerStatue'
import { shapeAdder } from '../../services/Shape/shapeAdder'
import { outsideSuccessChecker } from '../../services/Shape/successChecker'

const OuterStage = () => {
    const { t } = useTranslation()
    const { translate } = useShapeTranslate()

    const shapes: Record<string, string> = {
        Circle: '⚫️',
        Square: '⬛️',
        Triangle: '▲',
    }

    const call = useAtomValue(innerStatue)
    const [outerStatue, setOuterStatue] = useAtom(outerStatues)
    const [player, setPlayer] = useAtom(outerPlayer)

    const [pickShapes, setPickShapes] = useState<boolean[]>([
        false,
        false,
        false,
    ])

    const bottomShapes = [Shape.Circle, Shape.Square, Shape.Triangle]

    const [changeShape, setChangeShape] = useState<[Shape | null, number]>([
        null,
        -1,
    ])

    const playerClickHandler = (
        clickedStatue: [Shape | null, Shape | null],
        clickedIndex: number
    ): void => {
        // If player does not have a shape
        if (player === null) return

        // If player has a 3D shape, just remove it
        if (threeD.includes(player)) {
            setPlayer(null)
        }

        // If player clicked the statue does not have a same shape with player, does not work at all
        if (!clickedStatue.includes(player)) return

        // First click
        if (changeShape[0] === null) {
            setChangeShape([player, clickedIndex])
            setPlayer(null)
            return
        }

        // Second click but can't click the same statue again
        if (changeShape[0] !== null && changeShape[1] !== clickedIndex) {
            const firstStatueIndex = changeShape[1]
            const secondStatueIndex = clickedIndex

            const firstStatue = outerStatue[firstStatueIndex]
            const secondStatue = outerStatue[secondStatueIndex]

            const firstShapeIndex = firstStatue[0] === changeShape[0] ? 0 : 1
            const secondShapeIndex = secondStatue[0] === player ? 0 : 1

            const newOuterStatue: [
                [Shape | null, Shape | null],
                [Shape | null, Shape | null],
                [Shape | null, Shape | null],
            ] = [...outerStatue]

            newOuterStatue[firstStatueIndex][firstShapeIndex] = player

            const [firstShape] = changeShape
            newOuterStatue[secondStatueIndex][secondShapeIndex] = firstShape

            // Update the state
            setOuterStatue(newOuterStatue)
            setChangeShape([null, -1])
            setPlayer(null)
        }
    }

    useEffect(() => {
        const wholeShapes = [
            Shape.Circle,
            Shape.Square,
            Shape.Triangle,
            Shape.Circle,
            Shape.Square,
            Shape.Triangle,
        ]

        const shuffled = shuffleArray(wholeShapes)

        setOuterStatue([
            [shuffled[0], shuffled[1]],
            [shuffled[2], shuffled[3]],
            [shuffled[4], shuffled[5]],
        ])
    }, [])

    const successed = outsideSuccessChecker(outerStatue, call)

    if (
        outerStatue[0][0] == null ||
        outerStatue[0][1] == null ||
        outerStatue[1][0] == null ||
        outerStatue[1][1] == null ||
        outerStatue[2][0] == null ||
        outerStatue[2][1] == null
    ) {
        return null
    }

    return (
        <div className="flex w-full flex-col items-center">
            <div className="my-10 text-4xl font-black">
                {successed ? t('success') : t('trying')}
            </div>
            <div className="mb-10 flex flex-col items-center gap-4">
                <span className="text-2xl font-bold">{t('innerCall')}</span>
                <div className="flex items-center gap-10 text-lg font-semibold">
                    {call.map(item => (
                        <div>{translate(item)}</div>
                    ))}
                </div>
            </div>
            <div className="text-xl font-bold">
                {t('usershape')} : {translate(player)}
            </div>

            <div className="mt-10 flex items-center gap-20">
                {bottomShapes.map((shape, index) => (
                    <div
                        key={shape}
                        onClick={() => {
                            if (pickShapes[index]) {
                                return
                            }

                            setPlayer(shapeAdder(player, shape))
                            setPickShapes(prev =>
                                prev
                                    .slice(0, index)
                                    .concat(true)
                                    .concat(prev.slice(index + 1))
                            )
                        }}
                        className={`cursor-pointer text-5xl ${pickShapes[index] ? 'text-transparent' : 'text-black'}`}
                    >
                        {shapes[shape]}
                    </div>
                ))}
            </div>

            {pickShapes.some(item => item) && (
                <button
                    className="mt-10 bg-black p-5 text-white"
                    onClick={() => {
                        setPickShapes([false, false, false])
                    }}
                    type="button"
                >
                    {t('reset')}
                </button>
            )}

            <div className="mt-20 flex gap-32">
                <div className=" flex flex-col items-center gap-12">
                    <PlayerStatue
                        shape={shapeAdder(outerStatue[0][0], outerStatue[0][1])}
                        name="A"
                        bold
                        onClick={() => playerClickHandler(outerStatue[0], 0)}
                    />
                    <div className="flex items-center gap-2">
                        {outerStatue[0].map(
                            s => s !== null && <span>{shapes[s]}</span>
                        )}
                    </div>
                </div>
                <div className="relative top-10 flex flex-col items-center gap-12">
                    <PlayerStatue
                        shape={shapeAdder(outerStatue[1][0], outerStatue[1][1])}
                        name="B"
                        bold
                        onClick={() => playerClickHandler(outerStatue[1], 1)}
                    />
                    <div className="flex items-center gap-2">
                        {outerStatue[1].map(
                            s => s !== null && <span>{shapes[s]}</span>
                        )}
                    </div>
                </div>
                <div className=" flex flex-col items-center gap-12">
                    <PlayerStatue
                        shape={shapeAdder(outerStatue[2][0], outerStatue[2][1])}
                        name="C"
                        bold
                        onClick={() => playerClickHandler(outerStatue[2], 2)}
                    />
                    <div className="flex items-center gap-2">
                        {outerStatue[2].map(
                            s => s !== null && <span>{shapes[s]}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OuterStage
