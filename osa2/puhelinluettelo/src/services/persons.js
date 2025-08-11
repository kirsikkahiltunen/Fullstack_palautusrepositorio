import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = newPerson => {
    return axios.post(baseUrl, newPerson)
}

export default {
    getAll,
    addNew
}