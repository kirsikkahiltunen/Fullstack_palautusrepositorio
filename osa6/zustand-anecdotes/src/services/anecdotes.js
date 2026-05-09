import AnecdoteList from "../components/AnecdoteList"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok) {
        throw new Error ('Failed to fetch anecdotes')
    }

    const data = await response.json()

    return data
}

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create new anecdote')
    }
    return await response.json()
}

const addVote = async (anecdote) => {
    const url = `${baseUrl}/${anecdote.id}`
    const votes = anecdote.votes + 1 
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: anecdote.content, votes: votes })
    }
    const response = await fetch(url, options)

    if (!response.ok) {
        throw new Error('Failed to vote anecdote')
    }
    return await response.json()

}
export default { getAll, createNew, addVote }