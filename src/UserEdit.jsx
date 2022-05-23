import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

// Komponentin tilan määritys

const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstName)
const [newLastname, setNewLastname] = useState(muokattavaUser.lastName)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)
//const [newUsername, setNewUsername] = useState(muokattavaUser.userName)
//const [newPassword, setNewPassword] = useState(muokattavaUser.password)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId)
        //username: newUsername,
        //password: md5(newPassword)
    }
    
    UserService.update(muokattavaUser.userId, newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited User: " + newUser.firstName + " " + newUser.lastName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }


  return (
    <div id="edit">
       <h2>User Edit</h2>

       <form onSubmit={handleSubmit}>
            {/*<div>
                <input type="text" value={newFirstname} disabled />
  </div>*/}
            <div>
                <label>First name</label>
        </div>
            <div>
                <input type="text" value={newFirstname} placeholder="First Name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <label>Last name</label>
        </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} />
            </div>
            <div>
                <label>Email</label>
        </div>
            <div>
                <input type="text" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <label>Accesslevel ID</label>
        </div>
            <div>
                <input type="text" value={newAccesslevelId} placeholder="Accesslevel ID"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            {/*<div>
               {/* <label>Username</label>
        </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <label>Password</label>
        </div>
            <div>
                <input type="text" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
</div>*/}
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default UserEdit