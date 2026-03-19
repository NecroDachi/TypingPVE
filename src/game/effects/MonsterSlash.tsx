import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useGameStore } from "../../store/gameStore"
import { Mesh, MeshStandardMaterial } from "three"

export default function MonsterSlash() {

  const slashRef = useRef<Mesh>(null!)

  const incoming = useGameStore(s => s.bossAttackIncoming)

useFrame(() => {

  if (!slashRef.current) return

  const material = slashRef.current.material as MeshStandardMaterial

  if (incoming) {

    slashRef.current.scale.x += 0.5
    material.opacity -= 0.03

  } else {

    slashRef.current.scale.x = 0
    material.opacity = 1

  }

})
  return (

    <mesh
      ref={slashRef}
      position={[0, 1, -6]}
      scale={[0, 0.2, 0.2]}
    >

      <boxGeometry args={[5, 0.3, 0.1]} />

      <meshStandardMaterial
        color="black"
        transparent
      />

    </mesh>

  )

}