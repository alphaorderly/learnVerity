import { FC } from 'react'
import Shape from '../../types/shape'
import ShapeRender from '../Shapes/ShapeRender'

type PlayerStatueProps = {
    name: string
    shape?: Shape
}

const PlayerStatue: FC<PlayerStatueProps> = ({ name, shape }) => (
    <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-black ">
        <div className="text-2xl font-bold">{name}</div>
        {shape && (
            <div className="absolute -bottom-6 rounded-full bg-white p-1">
                <ShapeRender shape={shape} size="30px" />
            </div>
        )}
    </div>
)

export default PlayerStatue
