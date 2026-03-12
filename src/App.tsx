import { useEffect } from "react"
import { useGameStore } from "./store/gameStore"
import useKeyboard from "./hooks/useKeyboard"
import GameScene from "./game/GameScene"
import StatsPanel from "./components/ui/StatsPanel"

export default function App() {

  useKeyboard()

  const startAttack = useGameStore(s => s.startAttack)

  useEffect(() => {
    startAttack()
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GameScene />
      <StatsPanel />
    </div>
  )
}