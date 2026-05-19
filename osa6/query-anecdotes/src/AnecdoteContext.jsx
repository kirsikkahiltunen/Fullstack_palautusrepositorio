import { createContext, useState } from 'react'

const AnecdoteContext = createContext()

export default AnecdoteContext

export const AnecdoteContextProvider = (props) => {
    const [notification, setNotification] = useState('')
    return (
        <AnecdoteContext.Provider value={{ notification, setNotification }}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}