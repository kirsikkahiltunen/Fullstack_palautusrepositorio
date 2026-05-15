import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createAnecdote, voteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
  }

  const voteAnecdoteMutation = useMutation({
      mutationFn: voteAnecdote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      }
    })

  const result = useQuery({
    queryKey: ['anecdotes'],
    retry: 1,
    queryFn: getAll
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isPending) {
    return <div> loading data...</div>
  }

  if(result.isError) {
    return <div> anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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