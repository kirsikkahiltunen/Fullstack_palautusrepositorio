import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const deleteNumber = (deletedPerson) => {
    console.log(`${baseUrl}/${deletedPerson}`)
    return axios.delete(`${baseUrl}/${deletedPerson}`)
}

export default {
    getAll,
    addNew,
    deleteNumber
}