import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => { 
//Luetaan token localstoragesta
  const token = localStorage.getItem('token')
  //Asetetaan em. token CustomerServicessä olevaan muistipaikkaan
  CustomerService
  //Tehdään get pyyntö käyttäen CustomerServicen
      .setToken(token)
      
  CustomerService.getAll() //tällä haetaan asiakkaat
  .then(data => {
    setCustomers(data)
})
},[lisäystila, reload, muokkaustila] //toinen parametri on taulukko. Eli jos joku näistä muuttuu, ajetaan useEffect
)

  //Hakukentän onChange tapahtumankäsittelijä eli dynaaminen haku asiakkaille
  const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
}

const editCustomer = (customer) => {
  setMuokattavaCustomer(customer)
  setMuokkaustila(true)
}

  return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {/*jos lisäystila ja muokkaustila on false, näytetään input kenttä */}
                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <CustomerAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer}
                />}


        { //alla olevat ovat ehtoja, paitsi viimeinen. Jos lisäystila ja muokkaustila ei ole, sekä customers on, niin tehdään customers.map
           !lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => //aliasoidaan customer c-kirjaimella
            //showCustomers && customers && customers.map(c => (
            //tällä ylläolevalla koodilla se näyttäisi aina asiakkaat, kun hiiri hover sen päälle  
            {
                const lowerCaseName = c.companyName.toLowerCase()
                //jos asiakkaan kohdalla täyttyy hakutermi, mennään if:stä eteenpäin eli return
                if (lowerCaseName.indexOf(search) > -1) {
                    return(
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
                />
              )
                    }
                  }
            )
        }

    </>
  )
}

export default CustomerList