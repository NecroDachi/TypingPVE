import { useGameStore } from "../../store/gameStore"

export default function StatsPanel() {

  const startTime = useGameStore(s => s.startTime)
  const totalTyped = useGameStore(s => s.totalTyped)
  const correctTyped = useGameStore(s => s.correctTyped)
  const resetGame = useGameStore(s => s.resetGame)

  const elapsedMinutes = startTime
    ? (Date.now() - startTime) / 60000
    : 0

  const wpm = elapsedMinutes > 0
    ? Math.round((correctTyped / 5) / elapsedMinutes)
    : 0

  const accuracy = totalTyped > 0
    ? Math.round((correctTyped / totalTyped) * 100)
    : 100

  return (
    <div style={{
      position: "absolute",
      left: "20px",
      top: "20px",
      color: "white",
      fontFamily: "monospace",
      background: "rgba(0,0,0,0.6)",
      padding: "15px",
      borderRadius: "8px"
    }}>

      <div>WPM: {wpm}</div>
      <div>Accuracy: {accuracy}%</div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          cursor: "pointer"
        }}
      >
        Reset Boss
      </button>

    </div>
  )
}