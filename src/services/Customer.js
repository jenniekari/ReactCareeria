import axios from "axios";

const baseUrl ="https://localhost:44345/api/customers"

const getAll = () => {
    /*const config = {
        headers: { Authorization: token},
    }*/
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }