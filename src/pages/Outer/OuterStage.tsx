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
import ShapeRender from '../../components/Shapes/ShapeRender'

const Recipe = ({
    shape1,
    shape2,
    result,
    translate,
}: {
    shape1: Shape
    shape2: Shape
    result: Shape
    translate: (shape: Shape) => string
}) => (
    <div className="flex items-center justify-between rounded-xl bg-white/80 p-6 shadow-sm transition-all hover:scale-[1.02]">
        <div className="flex items-center gap-12">
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <ShapeRender shape={shape1} size="48px" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                        {translate(shape1)}
                    </span>
                </div>
                <span className="text-2xl font-light text-gray-400">+</span>
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <ShapeRender shape={shape2} size="48px" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                        {translate(shape2)}
                    </span>
                </div>
            </div>
            <span className="text-2xl font-light text-gray-400">=</span>
            <div className="flex flex-col items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                    <ShapeRender shape={result} size="48px" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                    {translate(result)}
                </span>
            </div>
        </div>
    </div>
)

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
        if (call.length !== 3) return

        const wholeShapes = [Shape.Circle, Shape.Triangle, Shape.Square]

        const shuffled = shuffleArray(wholeShapes)

        const left = shuffleArray([call[0], shuffled[0]]) as [Shape, Shape]
        const middle = shuffleArray([call[1], shuffled[1]]) as [Shape, Shape]
        const right = shuffleArray([call[2], shuffled[2]]) as [Shape, Shape]

        setOuterStatue([left, middle, right])
    }, [call])

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
        <div className="min-h-screen">
            <div className="mx-auto max-w-[1920px] p-8">
                <div className="flex flex-col items-center">
                    <div className="mb-16 text-4xl font-black text-gray-800">
                        {successed ? t('success') : t('trying')}
                    </div>

                    <div className="mb-12 flex flex-col items-center gap-6">
                        <span className="text-2xl font-bold text-gray-700">
                            {t('innerCall')}
                        </span>
                        <div className="flex items-center gap-10">
                            {call.map((item, index) => (
                                <div
                                    key={item + index.toFixed()}
                                    className="rounded-lg bg-white/80 px-4 py-2 text-lg font-medium shadow-sm"
                                >
                                    {translate(item)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white/80 px-5 py-2 text-xl font-bold text-gray-700 shadow-sm">
                        {t('usershape')} : {translate(player)}
                    </div>

                    <div className="mt-12 flex items-center gap-20">
                        {bottomShapes.map((shape, index) => (
                            <div
                                key={shape}
                                onClick={() => {
                                    if (pickShapes[index]) return
                                    setPlayer(shapeAdder(player, shape))
                                    setPickShapes(prev =>
                                        prev
                                            .slice(0, index)
                                            .concat(true)
                                            .concat(prev.slice(index + 1))
                                    )
                                }}
                                className={`cursor-pointer text-5xl transition-transform hover:scale-110 ${
                                    pickShapes[index]
                                        ? 'text-transparent'
                                        : 'text-gray-800'
                                }`}
                            >
                                {shapes[shape]}
                            </div>
                        ))}
                    </div>

                    {pickShapes.some(item => item) && (
                        <button
                            className="mt-10 rounded-lg bg-gray-800 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-700"
                            onClick={() => setPickShapes([false, false, false])}
                            type="button"
                        >
                            {t('reset')}
                        </button>
                    )}

                    <div className="mt-20 flex gap-32">
                        {[0, 1, 2].map(index => (
                            <div
                                key={index}
                                className={`flex flex-col items-center gap-12 ${index === 1 ? 'relative top-10' : ''}`}
                            >
                                <div className="rounded-2xl bg-white/50 p-4 transition-transform hover:scale-[1.02]">
                                    <PlayerStatue
                                        shape={shapeAdder(
                                            outerStatue[index][0],
                                            outerStatue[index][1]
                                        )}
                                        name={String.fromCharCode(65 + index)}
                                        bold
                                        onClick={() =>
                                            playerClickHandler(
                                                outerStatue[index],
                                                index
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-white/80 px-4 py-2 shadow-sm">
                                    {outerStatue[index].map(
                                        (s, i) =>
                                            s !== null && (
                                                <span
                                                    key={s + i.toFixed()}
                                                    className="text-2xl"
                                                >
                                                    {shapes[s]}
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-32 flex flex-col items-center gap-10">
                        <div className="text-3xl font-bold text-gray-800">
                            도형 조합 표
                        </div>
                        <div className="w-full max-w-4xl space-y-4 rounded-2xl bg-white/30 p-8 backdrop-blur-sm">
                            {[
                                {
                                    shape1: Shape.Circle,
                                    shape2: Shape.Circle,
                                    result: Shape.Sphere,
                                },
                                {
                                    shape1: Shape.Circle,
                                    shape2: Shape.Square,
                                    result: Shape.Cylinder,
                                },
                                {
                                    shape1: Shape.Circle,
                                    shape2: Shape.Triangle,
                                    result: Shape.Cone,
                                },
                                {
                                    shape1: Shape.Square,
                                    shape2: Shape.Square,
                                    result: Shape.Cube,
                                },
                                {
                                    shape1: Shape.Square,
                                    shape2: Shape.Triangle,
                                    result: Shape.Prism,
                                },
                                {
                                    shape1: Shape.Triangle,
                                    shape2: Shape.Triangle,
                                    result: Shape.Pyramid,
                                },
                            ].map(({ shape1, shape2, result }) => (
                                <Recipe
                                    key={`${shape1}-${shape2}-${result}`}
                                    shape1={shape1}
                                    shape2={shape2}
                                    result={result}
                                    translate={translate}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OuterStage
