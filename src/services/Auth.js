import axios from 'axios'

const baseUrl = "https://localhost:44345/api/Authentication"
//const baseUrl = "https://nwbackendsimo.azurewebsites.net/api/authentication"
//simon backend azuressa

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }