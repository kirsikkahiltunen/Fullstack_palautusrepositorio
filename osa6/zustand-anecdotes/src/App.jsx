import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import { useAnecdoteActions } from './store'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'

const App = () => {
  const { initialize } = useAnecdoteActions()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])


  return (
    <div>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App