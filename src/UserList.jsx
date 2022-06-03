import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [showUsers, setShowUsers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
//Luetaan token localstoragesta
const token = localStorage.getItem('token')
UserService
    .setToken(token)

  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowUsers(true)
    setSearch(event.target.value.toLowerCase())
}

const editUser = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

  return (
        <>
            <h1><nobr style={{ cursor: 'pointer' }}
            onClick={() => setShowUsers(!showUsers)}>Users</nobr>

            {lisäystila && <UserAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
            
            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
            }

            {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaUser={muokattavaUser}
                />}

            {!lisäystila && !muokkaustila &&
            <table id="userTable">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>

        
                {/*!lisäystila && !muokkaustila && showUsers && */users && users.map(u =>
                {
                    const lowerCaseName = u.lastName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={u.userId}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.accesslevelId}</td>
                                <User key={u.firstName} user={u} reloadNow={reloadNow} reload={reload}
                            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                            editUser={editUser}
                            />
                            </tr>
                                )
                            }
                        }
                    )
                }

                </tbody>

            </table>
            }
         </>
        )
    }

export default UserList