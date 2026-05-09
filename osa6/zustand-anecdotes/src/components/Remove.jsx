import { useAnecdoteActions } from '../store'
import anecdoteService from '../services/anecdotes'

const RemoveAnecdote = ({ id }) => {
    const { remove } = useAnecdoteActions()
    const style = {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10
  }

    const handleDelete = async () => {
        const removedAnecdote = await anecdoteService.deleteAnecdote(id)
        remove(id)
    }

    return (
        <button onClick={ handleDelete } style={style}> remove </button>
    )

}
export default RemoveAnecdote