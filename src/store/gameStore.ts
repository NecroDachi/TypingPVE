import { create } from "zustand"
import { generate } from "random-words"

type Phase =
  | "idle"
  | "attack"
  | "defend"
  | "monsterDead"

interface GameState {

  phase: Phase

  startTime: number | null
  totalTyped: number
  correctTyped: number

  combo: number

  monsterHP: number
  playerHP: number
  monsterMaxHP: number
  bossLevel: number

  word: string
  typedLetters: string[]

  resetGame: () => void
  startAttack: () => void
  startDefense: () => void
  typeLetter: (key: string) => void
}

function randomWord(level: number = 1) {
  return (generate({
    minLength: 3 + level,
    maxLength: 6 + level
  }) as string).toLowerCase()
}

export const useGameStore = create<GameState>((set, get) => ({

  phase: "idle",

  monsterHP: 100,
  monsterMaxHP: 100,
  bossLevel: 1,
  playerHP: 100,

  startTime: null,
  totalTyped: 0,
  correctTyped: 0,

  combo: 0,

  word: "",
  typedLetters: [],

  resetGame: () => {

    set({
      phase: "idle",
      monsterHP: 100,
      monsterMaxHP: 100,
      bossLevel: 1,
      playerHP: 100,
      word: "",
      typedLetters: [],
      startTime: null,
      totalTyped: 0,
      correctTyped: 0,
      combo: 0
    })

  },

  startAttack: () => {

    set({
      phase: "attack",
      word: randomWord(get().bossLevel),
      typedLetters: [],
      startTime: Date.now(),
      totalTyped: 0,
      correctTyped: 0,
      combo: 0
    })

  },

  startDefense: () => {

    set({
      phase: "defend",
      word: randomWord(get().bossLevel),
      typedLetters: []
    })

  },

  typeLetter: (key) => {

    const { word, typedLetters, phase } = get()

    if (key === "Backspace") {
      set({
        typedLetters: typedLetters.slice(0, -1)
      })
      return
    }

    if (typedLetters.length >= word.length) return

    const correctKey = key === word[typedLetters.length]

    const nextLetters = [...typedLetters, key]

    set({
      typedLetters: nextLetters,
      totalTyped: get().totalTyped + 1,
      correctTyped: correctKey ? get().correctTyped + 1 : get().correctTyped,
      combo: correctKey ? get().combo + 1 : 0
    })

    if (nextLetters.length === word.length) {

      const correctWord = nextLetters.every((l, i) => l === word[i])

      if (correctWord) {

        if (phase === "attack") {

          const state = get()

          const elapsedMinutes =
            state.startTime
              ? (Date.now() - state.startTime) / 60000
              : 1

          const wpm = Math.round((state.correctTyped / 5) / elapsedMinutes)

          const comboMultiplier = 1 + state.combo * 0.05
          const wpmMultiplier = 1 + wpm / 100

          const baseDamage = 20

          const damage = Math.round(
            baseDamage * comboMultiplier * wpmMultiplier
          )

          const newHP = state.monsterHP - damage

          console.log(
            "⚔️ DAMAGE",
            damage,
            "| Combo:",
            state.combo,
            "| WPM:",
            wpm
          )

          if (newHP <= 0) {

            const nextMax = state.monsterMaxHP + 20

            set({
              bossLevel: state.bossLevel + 1,
              monsterMaxHP: nextMax,
              monsterHP: nextMax,
              typedLetters: [],
              word: randomWord(state.bossLevel + 1)
            })

          } else {

            set({
              monsterHP: newHP,
              typedLetters: [],
              word: randomWord(state.bossLevel)
            })

          }

        }

        if (phase === "defend") {

          console.log("🛡 blocked attack")

          set({
            typedLetters: [],
            word: randomWord(get().bossLevel)
          })

        }

      }

    }

  }

}))