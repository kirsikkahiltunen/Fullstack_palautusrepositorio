import { getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, test, vi } from 'vitest'

test('renders title and author', () => {
    const blog = {
        title: 'Testi blogi',
        author: 'Erkki Esimerkki',
        likes: 3,
        url: 'testiblogi.fi',
        user: {
            name: 'test user'
        } 
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.findByText('Testi blogi')
    const authorElement = screen.findByText('Erkki Esimerkki')
    const urlElement = screen.queryByText('testiblogi.fi')
    const likesElement = screen.queryByText(3)
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
})

test('Url, likes and user are rendered when view button is pressed', async () => {
    const blog = {
        title: 'Testi blogi',
        author: 'Erkki Esimerkki',
        likes: 3,
        url: 'testiblogi.fi',
        user: {
            username: 'Testi123',
            name: 'test user'
        }
    }

    render(<Blog blog={blog} user={'test user'}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const titleElement = screen.findByText('Testi blogi')
    const authorElement = screen.findByText('Erkki Esimerkki')
    const urlElement = screen.findByText('testiblogi.fi')
    const likesElement = screen.findByText(3)
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
})

test('When like-buton is pressed two times, event handler is called two times', async () => {
    const blog = {
        title: 'Testi blogi',
        author: 'Erkki Esimerkki',
        likes: 3,
        url: 'testiblogi.fi',
        user: {
            username: 'Testi123',
            name: 'test user'
        }
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} user={'test user'} addNewLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

