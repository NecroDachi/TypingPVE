import { useRef } from "react"
import { Text } from "@react-three/drei"
import { useGameStore } from "../../store/gameStore"
import * as THREE from "three"

type Props = {
  position: [number, number, number]
}

export default function MonsterHP({ position }: Props) {

  const hpRef = useRef<THREE.Mesh>(null!)

  const monsterHP = useGameStore(s => s.monsterHP)
  const maxHP = useGameStore(s => s.monsterMaxHP)

  const fullWidth = 3
  const hpPercent = monsterHP / maxHP
  const hpWidth = fullWidth * hpPercent

  return (
    <group position={position}>
    
      {/* HP BAR */}
      <mesh
        ref={hpRef}
        position={[-fullWidth / 2 + hpWidth / 2, 0, 0]}
      >
        <boxGeometry args={[hpWidth, 0.25, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* HP TEXT */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {monsterHP}/{maxHP}
      </Text>

    </group>
  )
}