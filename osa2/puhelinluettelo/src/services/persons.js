import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

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

const changeNumber = (id, newNumber) => {
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

export default {
    getAll,
    addNew,
    deleteNumber,
    changeNumber
}