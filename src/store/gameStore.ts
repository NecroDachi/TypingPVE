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
  monsterMaxHP: number
  bossLevel: number

  bossAttacking: boolean
  bossAttackIncoming: boolean

  playerHP: number
  playerMaxHP: number

  // 🔥 TWO WORDS
  attackWord: string
  attackTyped: string[]

  defendWord: string
  defendTyped: string[]

  startBossAttack: () => void
  resolveBossAttack: () => void
  resetGame: () => void
  startAttack: () => void
  startDefense: () => void

  typeLetter: (key: string) => void
}

function randomWord(): string {
  const isLongWord = Math.random() < 0.15

  if (isLongWord) {
    return String(generate({ minLength: 8, maxLength: 12 }))
  }

  return String(generate({ minLength: 3, maxLength: 6 }))
}

export const useGameStore = create<GameState>((set, get) => ({

  phase: "idle",

  monsterHP: 100,
  monsterMaxHP: 100,
  bossLevel: 1,

  playerHP: 100,
  playerMaxHP: 100,

  startTime: null,
  totalTyped: 0,
  correctTyped: 0,

  combo: 0,

  // ✅ INIT BOTH WORDS
  attackWord: randomWord(),
  attackTyped: [],

  defendWord: randomWord(),
  defendTyped: [],

  bossAttackIncoming: false,
  bossAttacking: false,

  startBossAttack: () => {
    set({ bossAttackIncoming: true })

    setTimeout(() => {
      get().resolveBossAttack()
    }, 1500)
  },

  resolveBossAttack: () => {

    const blocked = get().defendTyped.length > 0

    if (!blocked) {
      const newHP = get().playerHP - 15
      set({ playerHP: Math.max(newHP, 0) })
    }

    set({
      bossAttackIncoming: false,
      defendTyped: [],
      defendWord: randomWord()
    })
  },

  resetGame: () => {
    set({
      phase: "idle",

      monsterHP: 100,
      monsterMaxHP: 100,
      bossLevel: 1,

      playerHP: 100,
      playerMaxHP: 100,

      attackWord: randomWord(),
      attackTyped: [],

      defendWord: randomWord(),
      defendTyped: [],

      startTime: null,
      totalTyped: 0,
      correctTyped: 0,

      combo: 0
    })
  },

  startAttack: () => {
    set({
      phase: "attack",

      attackWord: randomWord(),
      attackTyped: [],

      defendWord: randomWord(),
      defendTyped: [],

      startTime: Date.now(),
      totalTyped: 0,
      correctTyped: 0,
      combo: 0
    })
  },

  startDefense: () => {
    set({
      phase: "defend",
      defendWord: randomWord(),
      defendTyped: []
    })
  },

  // 🔥 MAIN LOGIC (AUTO ROUTING)
  typeLetter: (key) => {

    const state = get()

    const {
      attackWord,
      attackTyped,
      defendWord,
      defendTyped
    } = state

    const nextAttackLetter = attackWord[attackTyped.length]
    const nextDefendLetter = defendWord[defendTyped.length]

    let lane: "attack" | "defend" | null = null

    if (key === nextAttackLetter) {
      lane = "attack"
    } else if (key === nextDefendLetter) {
      lane = "defend"
    }

    if (!lane) return

    // ================= ATTACK =================
    if (lane === "attack") {

      const nextLetters = [...attackTyped, key]

      set({
        attackTyped: nextLetters,
        totalTyped: state.totalTyped + 1,
        correctTyped: state.correctTyped + 1,
        combo: state.combo + 1
      })

      if (nextLetters.length === attackWord.length) {

        const elapsedMinutes = Math.max(
          state.startTime
            ? (Date.now() - state.startTime) / 60000
            : 1,
          0.01
        )

        const wpm =
          Math.round((state.correctTyped / 5) / elapsedMinutes)

        const damage =
          Math.round(20 * (1 + state.combo * 0.05) * (1 + wpm / 100))

        const newHP = Math.max(state.monsterHP - damage, 0)

        if (newHP <= 0) {

          const nextMax = state.monsterMaxHP + 20

          set({
            bossLevel: state.bossLevel + 1,
            monsterMaxHP: nextMax,
            monsterHP: nextMax,
            attackTyped: [],
            attackWord: randomWord()
          })

        } else {

          set({
            monsterHP: newHP,
            attackTyped: [],
            attackWord: randomWord()
          })

        }

      }
    }

    // ================= DEFEND =================
    if (lane === "defend") {

      const nextLetters = [...defendTyped, key]

      set({
        defendTyped: nextLetters,
        totalTyped: state.totalTyped + 1,
        correctTyped: state.correctTyped + 1
      })

      if (nextLetters.length === defendWord.length) {

        console.log("🛡 DEFENSE SUCCESS")

        set({
          defendTyped: [],
          defendWord: randomWord()
        })

      }
    }

  }

}))