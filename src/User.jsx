import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'

//props on nimeltään user
const User = ({user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {
    let vastaus = window.confirm("Do you want to remove user: " + user.firstName + " " + user.lastName + " ?")
    if (vastaus === true){
      
    UserService.remove(user.firstName)
    .then(res =>{
        if (res.status === 200){
            setMessage(`Successfully removed user ${user.firstName + " " + user.lastName}`)
            setIsPositive(true)
            setShowMessage(true)        
            //Scrollataan ylös jotta nähdään alert
            window.scrollBy(0, -10000)

            //Ilmoituksen piilotus
            setTimeout(() => {
            setShowMessage(false)},
            5000 //millisekunteina aika, eli 0,5 sekuntia
            )
            reloadNow(!reload)
            }
            
                }
            )
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)
        
                setTimeout(() => {
                  setShowMessage(false)
                 }, 6000)
              })
    
        } //Jos poisto halutaankin perua
        else {
        setMessage('Delete cancelled.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
    
            //Ilmoituksen piilotus
            setTimeout(() => {
            setShowMessage(false)},
            5000
            )
        }
    }

  return (
    <div>

        <h4 onClick={() => setShowDetails(!showDetails)}>
           Buttons
        </h4>

       {showDetails && <div>
                <button className="button2" onClick={() => editUser(user)}>Edit</button>
                <button className="button2" onClick={() => deleteUser(user)}>Delete</button>
                </div>}
    </div>
  )
}

export default User