import { FC } from 'react'
import Shape from '../../types/shape'
import ShapeRender from '../Shapes/ShapeRender'

type PlayerStatueProps = {
    name: string
    shape: Shape | null
    bold: boolean
    onClick?: () => void
}

const PlayerStatue: FC<PlayerStatueProps> = ({
    name,
    shape,
    bold,
    onClick,
}) => (
    <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-black ">
        <div
            className="text-2xl"
            style={{
                fontWeight: bold ? 'bolder' : 'light',
            }}
            onClick={onClick}
        >
            {name}
        </div>
        <div className="absolute -bottom-6 rounded-full bg-white p-1">
            <ShapeRender shape={shape} size="30px" />
        </div>
    </div>
)

export default PlayerStatue
