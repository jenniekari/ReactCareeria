import axios from "axios";

const baseUrl ="https://localhost:44345/api/Customers"

//jos ei yhtään parametria, niin riittää tyhjät sulkeet
const getAll = () => {
    /*const config = {
        headers: { Authorization: token},
    }*/
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//jos on vain yksi parametri, ei tarvitse sulkeita. Jos olisi monta, tarvitaan sulkeet
const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

export default { getAll, create }