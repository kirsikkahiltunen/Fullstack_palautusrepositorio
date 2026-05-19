import { createAnecdote } from '../requests'
import { useAnecdotes } from '../hooks/useAnecdotes'
import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const AnecdoteForm = () => {
  const { notification, setNotification } = useContext(AnecdoteContext)
  const { anecdotes, isPending, addAnecdote: addAnecdoteToServer, voteAnecdote } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    console.log('new anecdote')
    addAnecdoteToServer(content)

    setNotification(`Anecdote: "${content}" created`)
    setTimeout(() => {
      setNotification(null)}, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm