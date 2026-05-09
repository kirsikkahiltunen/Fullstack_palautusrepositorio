import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  message: null,
  actions: {
    incrementVotes: (id) => set((state) => ({ 
      anecdotes: state.anecdotes.map((anecdote) => anecdote.id === id 
         ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)})),
    add: anecdote => set((state) => ({ 
      anecdotes: state.anecdotes.concat(anecdote) })
    ),
    sortAnecdotes: () => set((state) => ({
      anecdotes: state.anecdotes.toSorted((a, b) => (b.votes - a.votes)) 
    })),
    setFilter: value => set(() => ({ filter: value })
    ),
    initialize: anecdotes => set(() => ({
      anecdotes: anecdotes.toSorted((a, b) => (b.votes - a.votes))
    })),
    setMessage: value => set(() => ({ message: value }))
  },
}))

const useNotificationStore = create((set) => ({
  message: null,
  actions: {
    setMessage: value => set(() => ({ message: value }))
  },
}))


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter!='') return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  return anecdotes
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useMessage = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)