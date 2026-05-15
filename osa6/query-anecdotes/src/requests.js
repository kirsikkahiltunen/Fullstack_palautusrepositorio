const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
      const response = await fetch(baseUrl)
      if(!response.ok){
        throw new Error('Fetching anecdotes failed')
      }
      return await response.json()
    }
export const createAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }
    const response = await fetch(baseUrl, options)
    if(!response.ok){
        throw new Error('Creating an new anecdote failed')
      }
      return await response.json()
}

export const voteAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: anecdote.content, votes: anecdote.votes + 1 })
    }
    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
    if(!response.ok){
        throw new Error('Voting an anecdote failed')
      }
      return await response.json()
}