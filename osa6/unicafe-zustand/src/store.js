import { create } from 'zustand'

export const useFeedbackStore = create(set => ({
  all: 0,
  good: 0,
  neutral: 0,
  bad: 0,
  average: 0,
  positive: 0,
  incrementAll: () => set(state => ({ all: state.all + 1 })),
  incrementGood: () => set(state => ({ good: state.good + 1, all: state.all + 1 })),
  incrementNeutral: () => set(state => ({ neutral: state.neutral + 1, all: state.all + 1 })),
  incrementBad: () => set(state => ({ bad: state.bad + 1, all: state.all + 1 })),
  updateAverage: () => set(state => ({ average: (state.good - state.bad)/state.all })),
  updatePositive: () => set(state => ({ positive: (state.good/state.all)*100 }))
}))