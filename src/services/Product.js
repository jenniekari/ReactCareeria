import axios from "axios";

const baseUrl ="https://localhost:44345/api/Products"

let token = null

// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

//jos ei yhtään parametria, niin riittää tyhjät sulkeet
const getAll = () => {
    const config = {
        headers: { Authorization: token},
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

//jos on vain yksi parametri, ei tarvitse sulkeita. Jos olisi monta, tarvitaan sulkeet
const create = newProduct => {
    const config = {
        headers: { Authorization: token},
    }
    return axios.post(baseUrl, newProduct, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token},
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

//ei ole pakko käyttää sulkuja olion ympärillä, kun käytetään yhtä
const update = (id, object) => {
    const config = {
        headers: { Authorization: token},
    }
    //ensin url ja sitten olio, joka oltiin nimetty ylemmällä rivillä eli olio
    return axios.put(`${baseUrl}/${id}`, object, config)
}

export default { getAll, create, remove, update }