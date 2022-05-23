import axios from "axios";

const baseUrl ="https://localhost:44345/api/Users"

//jos ei yhtään parametria, niin riittää tyhjät sulkeet
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//jos on vain yksi parametri, ei tarvitse sulkeita. Jos olisi monta, tarvitaan sulkeet
const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

//ei ole pakko käyttää sulkuja olion ympärillä, kun käytetään yhtä
const update = (id, object) => {
    //ensin url ja sitten olio, joka oltiin nimetty ylemmällä rivillä eli olio
    return axios.put(`${baseUrl}/${id}`, object)
}

export default { getAll, create, remove, update }