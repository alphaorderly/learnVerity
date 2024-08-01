import { FC } from 'react'
import InnerStage from './Inner/InnerStage'

const MainStage: FC = () => (
    <div className="flex select-none flex-col">
        <InnerStage />
    </div>
)

export default MainStage
