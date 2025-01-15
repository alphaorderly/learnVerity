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
    <div
        className={`flex cursor-pointer flex-col items-center gap-4 ${
            bold ? 'font-bold' : ''
        }`}
        onClick={onClick}
    >
        <div className="flex size-32 items-center justify-center rounded-full bg-white shadow-md">
            <div className="flex size-24 items-center justify-center">
                <ShapeRender shape={shape} size="64px" />
            </div>
        </div>
        <div className="text-xl">{name}</div>
    </div>
)

export default PlayerStatue
