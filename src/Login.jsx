import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser, setIsAdmin}) => {

//Komponentin tilan määritys
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')


//onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        userName: username,
        //password: password
        password: md5(password) // Salataan md5 kirjaston metodilla
    }

    //Käytetään services/Auth.js tiedoston metodia
    LoginService.authenticate(userForAuth)
    .then(response => {
        if (response.status === 200) {
     
        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("userName", response.data.userName)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        
        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.userName)

        if (response.data.accesslevelId === 1) {
          setIsAdmin(true)
        }
        else {
          setIsAdmin(false)
        }

       setMessage(`Logged in as: ${userForAuth.userName}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
      })
      .catch(error => {
        setMessage(error.response.data)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    //Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    } 


  return (
    <div id="loginWindow">
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={username} placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            
         <input type='submit' value='Login' />
         <input type='button' value='Empty' onClick={() => emptyFields()} />
       </form>

    </div>
  )
}

export default Login