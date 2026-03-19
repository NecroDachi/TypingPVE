import { Canvas } from "@react-three/fiber"
import Attacker from "../components/characters/Attacker"
import Defender from "../components/characters/Defender"
import Monster from "../components/monsters/Monster"
import Ground from "./Ground"
import Lights from "./Lights"
import BossAttackIndicator from "../components/ui/BossAttackIndicator"
import PlayerHP from "../components/ui/PlayerHp"

export default function GameScene() {

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0,5,10], fov: 50 }}
    >

      <Lights  />

      <PlayerHP />
      <Attacker />
      <Defender />

      <BossAttackIndicator />
      <Monster />

      <Ground />

    </Canvas>
  )

}