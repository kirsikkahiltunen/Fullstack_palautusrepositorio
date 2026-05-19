import { createAnecdote } from '../requests'
import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { notification, setNotification } = useNotify()
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