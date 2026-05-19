import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import AnecdoteContext from './AnecdoteContext'
import { useState } from 'react'

const App = () => {
  const [notification, setNotification] = useState('')
  const { anecdotes, isPending, isError, addAnecdote: addAnecdoteToServer, voteAnecdote } = useAnecdotes()

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdote(anecdote)

    setNotification(`Anecdote: "${anecdote.content}" voted`)
    setTimeout(() => {
      setNotification(null)}, 5000)
  }

  if(isPending) {
    return <div> loading data...</div>
  }

  if(isError) {
    return <div> anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteContext.Provider value={{ notification, setNotification }}>
        <Notification />
        <AnecdoteForm />
      </AnecdoteContext.Provider>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App