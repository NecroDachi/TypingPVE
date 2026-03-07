import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"

export default function Monster() {

  const ref = useRef<Group>(null!)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = 1 + Math.sin(clock.elapsedTime) * 0.2
  })

  return (
    <group ref={ref} position={[0, 1, -9]}>

      {/* MAIN BLACK BOX */}
      <mesh>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* LEFT EYE */}
      <mesh position={[-0.6, 0.5, 1.26]}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* RIGHT EYE */}
      <mesh position={[0.6, 0.5, 1.26]}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* TEETH ROW */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[-0.9 + i * 0.36, -0.7, 1.26]}
        >
          <coneGeometry args={[0.15, 0.4, 4]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

    </group>
  )
}