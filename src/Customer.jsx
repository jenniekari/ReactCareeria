import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer'

//props on nimeltään customer
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteCustomer = (customer) => {
    let vastaus = window.confirm("Do you want to remove customer: " + customer.companyName + " ?")
    if (vastaus === true){
        //tai kaksi ylempää riviä yhdelle riville: if (window.confirm("Do you want to remove customer: " + customer.companyName + " ?") === true){

    CustomerService.remove(customer.customerId)
    .then(res =>{
        if (res.status === 200){
            setMessage(`Successfully removed customer ${customer.companyName}`)
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
    <div className='customerDiv'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>
           {customer.companyName} , {customer.country}
        </h4>

       {showDetails && <div className="customerDetails">
                <h3>{customer.companyName}</h3>
                <button onClick={() => editCustomer(customer)}>Edit</button>
                <button onClick={() => deleteCustomer(customer)}>Delete</button>
                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Customer