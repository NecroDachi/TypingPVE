import TypingPrompt from "../ui/TypingPrompt"
import Character from "./Character"

export default function Attacker(){

  return (
    <>
      <Character
        position={[-4,-2,4]}
        color="#4ECDC4"
      />
      <TypingPrompt position={[-3,2,5]} lane="attack"/>
    </>
  )

}