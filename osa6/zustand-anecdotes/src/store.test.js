import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        addVote: vi.fn(),
        deleteAnecdote: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions, useNotificationActions, useFilter, useMessage } from './store'

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter:'' })
    vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
    it('initialize loads anecdotes from backend', async() => {
        const mockAnecdotes = [{
            "content": "Test anecdote",
            "votes": 3,
            "id": "1"
            }
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual((mockAnecdotes))
    })
    it('store returns anecdotes sorted by votes', async() => {
         const mockAnecdotes = [{
            "content": "Test anecdote",
            "votes": 3,
            "id": "1"
            },
            {
            "content": "Another anecdote",
            "votes": 2,
            "id": "2"
            },
            {
            "content": "New anecdote",
            "votes": 7,
            "id": "3"
            }
        ]

        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current[0]).toEqual((mockAnecdotes[2]))
        expect(anecdoteResult.current[1]).toEqual((mockAnecdotes[0]))
        expect(anecdoteResult.current[2]).toEqual((mockAnecdotes[1]))
    })
})