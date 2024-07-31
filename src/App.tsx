import './App.css'
import PlayerStatue from './components/Statue/PlayerStatue'
import Shape from './types/shape'

function App() {
    return (
        <div className="flex flex-col gap-10">
            <PlayerStatue name="A" shape={Shape.Circle} />
            <PlayerStatue name="B" shape={Shape.Square} />
            <PlayerStatue name="C" shape={Shape.Triangle} />
            <PlayerStatue name="D" shape={Shape.Sphere} />
            <PlayerStatue name="E" shape={Shape.Cube} />
            <PlayerStatue name="F" shape={Shape.Pyramid} />
            <PlayerStatue name="G" shape={Shape.Cylinder} />
            <PlayerStatue name="H" shape={Shape.Cone} />
            <PlayerStatue name="I" shape={Shape.Prism} />
        </div>
    )
}

export default App
