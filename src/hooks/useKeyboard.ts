import { useEffect } from "react"
import { useGameStore } from "../store/gameStore"

export default function useKeyboard(){

  useEffect(()=>{

    const handleKey = (e:KeyboardEvent) => {
      useGameStore.getState().typeLetter(e.key)
    }

    window.addEventListener("keydown",handleKey)

    return () =>
      window.removeEventListener("keydown",handleKey)

  },[])

}