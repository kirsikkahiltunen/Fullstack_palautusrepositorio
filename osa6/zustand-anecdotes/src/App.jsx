import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useAnecdoteActions } from './store'
import { useEffect } from 'react'

const App = () => {
  const { initialize } = useAnecdoteActions()
  useEffect(() => {
    initialize()
  }, [initialize])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App