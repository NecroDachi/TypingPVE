import Character from "./Character"
import TypingPrompt from "../ui/TypingPrompt"

export default function Defender(){

  return (
    <>
      <Character
        position={[4,-2,4]}
        color="#6C5CE7"
      />
      <TypingPrompt position={[3,2,5]} lane="defend"/>
    </>
    
  )

}