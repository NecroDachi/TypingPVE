import { Text } from "@react-three/drei"
import { useGameStore } from "../store/gameStore"

type TypingPromptProps = {
  position: [number, number, number]
}

export default function TypingPrompt({ position }: TypingPromptProps) {

  const word = useGameStore(s => s.word)
  const typed = useGameStore(s => s.typedLetters)

  return ( 
  
    )
}