import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'
//import Viesti from './Viesti';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
/*
  //App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false) //boolean

  //Statet messgaen näyttämistä varten*/
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)


  /*const huomio = () => {
    alert("Huomio!")
  }*/

  return (
    <div className="App">
      <Router>

      <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href='/Customers' className='nav-link'>Customers</Nav.Link>
              <Nav.Link href='/Users' className='nav-link'>Users</Nav.Link>
              <Nav.Link href='/Laskuri' className='nav-link'>Laskuri</Nav.Link>
              <Nav.Link href='/Posts' className='nav-link'>Typicode posts</Nav.Link>
            </Nav>
          </Navbar>
{/*
      <header className="App-header">
        <hi>Hello from React!</hi>

        {/*Kaikki muu on html, paitsi curly brackettien sisällä on javascriptiä. Kuten tämä ja alla oleva!*/}
{/*        {showMessage && <Message message={message} isPositive={isPositive}/>}

        <p></p>

        <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>

        {/*jos showlaskuri on tosi, näytä laskuri.*/}
        {/*{showLaskuri && <Laskuri huomio={huomio}/>}
        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        {/*<Viesti teksti="Tervehdys app komponentista!"></Viesti>*/}

        {/*<Posts></Posts>*/}
      {/*</header>*/}

      
      <h2>Northwind Traders</h2>

      {showMessage && <Message message={message} isPositive={isPositive} />}


      <Switch>
                <Route path="/Customers"> <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>

      <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>
  
                <Route path="/Laskuri"> <Laskuri /></Route>
                <Route path="/Posts"> <Posts /></Route>

          </Switch>

      </Router>
    </div>
  );
}

export default App;
