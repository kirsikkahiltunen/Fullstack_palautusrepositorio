import { useAnecdotes, useAnecdoteActions, useNotificationActions } from '../store'
import anecdoteService from '../services/anecdotes'
import RemoveAnecdote from './Remove'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes, sortAnecdotes } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()

  const vote = async ({ anecdote }) => {
    console.log('vote', anecdote.id)
    const newVote = await anecdoteService.addVote(anecdote)
    incrementVotes(anecdote.id)
    sortAnecdotes()
    setMessage(`You voted "${anecdote.content}"`)
    setTimeout(() => {
      setMessage(null)}, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote({ anecdote } )}>vote</button>
          </div>
          {anecdote.votes === 0 && 
          <div>
            <RemoveAnecdote id={anecdote.id} />
          </div>}
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList