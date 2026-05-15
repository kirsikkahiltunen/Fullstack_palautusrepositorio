import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createAnecdote, voteAnecdote } from '../requests'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        retry: 1,
        queryFn: getAll,
        refetchOnWindowFocus: false
    })

    const voteAnecdoteMutation = useMutation({
      mutationFn: voteAnecdote,
      onSuccess: (modifiedAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) => anecdote.id === modifiedAnecdote.id ? { ...anecdote, votes: modifiedAnecdote.votes } : anecdote))
      }
    })

    const newAnecdoteMutation = useMutation({
      mutationFn: createAnecdote,
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
        voteAnecdote: (anecdote) => voteAnecdoteMutation.mutate(anecdote)
    }

}
