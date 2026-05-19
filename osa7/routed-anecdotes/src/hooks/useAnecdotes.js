import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = ((anecdote) => {
        anecdoteService.createNew(anecdote)
        .then(newAnecdote => {setAnecdotes(anecdotes.concat(newAnecdote))
    })})

    const removeAnecdote = ((id) => {
        anecdoteService.deleteAnecdote(id)
        .then(removedAnecdote => {setAnecdotes(anecdotes.filter(anecdote => anecdote.id != id))})
    })

    return {
        anecdotes,
        addAnecdote,
        removeAnecdote
    }
}
export default useAnecdotes