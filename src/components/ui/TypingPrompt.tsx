import { Text } from "@react-three/drei"
import { useGameStore } from "../../store/gameStore"

type Props = {
  position: [number, number, number]
}

export default function TypingPrompt({ position }: Props) {

  const word = useGameStore(s => s.word)
  const typedLetters = useGameStore(s => s.typedLetters)

  // find first mistake
  const firstErrorIndex = typedLetters.findIndex(
    (l, i) => l !== word[i]
  )

  return (
    <group position={position}>
        {word.split("").map((letter, i) => {

        let color = "white"

        if (typedLetters[i]) {

                    if (firstErrorIndex !== -1 && i >= firstErrorIndex) {
            color = "red"
          }
          else {
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