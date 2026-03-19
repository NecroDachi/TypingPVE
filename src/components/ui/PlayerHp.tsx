import { Text } from "@react-three/drei"
import { useGameStore } from "../../store/gameStore"

export default function PlayerHP() {

  const hp = useGameStore(s => s.playerHP)
  const max = useGameStore(s => s.playerMaxHP)

  return (
    <Text
      position={[-4,2,-4]}
      fontSize={0.5}
      color="lime"
    >
      HP {hp}/{max}
    </Text>
  )
}