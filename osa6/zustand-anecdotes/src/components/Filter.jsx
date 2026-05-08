import { useAnecdoteActions } from "../store"

const Filter = () => {
    const { setFilter } = useAnecdoteActions()

    const handleChange = (event) => {
        const filter = event.target.value
        setFilter(filter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}
export default Filter