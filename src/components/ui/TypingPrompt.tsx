import { Text } from "@react-three/drei"
import { useGameStore } from "../../store/gameStore"

type Props = {
  position: [number, number, number]
  lane: "attack" | "defend"
}

export default function TypingPrompt({ position, lane }: Props) {

  const word = useGameStore(s =>
    lane === "attack" ? s.attackWord : s.defendWord
  )

  const typed = useGameStore(s =>
    lane === "attack" ? s.attackTyped : s.defendTyped
  )

  const firstErrorIndex = typed.findIndex((l, i) => l !== word[i])

  return (
    <group position={position}>
      {word.split("").map((letter, i) => {

        let color = "white"

        if (typed[i]) {
          if (firstErrorIndex !== -1 && i >= firstErrorIndex) {
            color = "red"
          } else {
            color = "lime"
          }
        }

        return (
          <Text
            key={i}
            position={[i * 0.35, 0, 0]}
            fontSize={0.5}
            color={color}
            anchorX="center"
          >
            {letter}
          </Text>
        )
      })}
    </group>
  )
}