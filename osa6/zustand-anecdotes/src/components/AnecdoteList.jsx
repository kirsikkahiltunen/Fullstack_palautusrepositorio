import { useAnecdotes, useAnecdoteActions } from '../store'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes, sortAnecdotes } = useAnecdoteActions()

  const vote = async ({ anecdote }) => {
    console.log('vote', anecdote.id)
    const newVote = await anecdoteService.addVote(anecdote)
    incrementVotes(anecdote.id)
    sortAnecdotes()
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
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList