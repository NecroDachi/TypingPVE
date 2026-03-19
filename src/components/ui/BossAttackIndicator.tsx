import { useEffect } from "react"
import { useGameStore } from "../../store/gameStore"

export default function GameController() {

  useEffect(() => {

    const interval = setInterval(() => {
      useGameStore.getState().startBossAttack()
    }, 5000) // boss attacks every 5s

    return () => clearInterval(interval)

  }, [])

  return null
}