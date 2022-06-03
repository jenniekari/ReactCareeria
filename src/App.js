import React, {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'
import Login from './Login'
import ProductList from './ProductList'
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
  const [loggedInUser, setLoggedInUser] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let storedUser = localStorage.getItem("userName")
    if (storedUser !== null) {
      setLoggedInUser(storedUser)
    }
    let storedAccess = localStorage.getItem("accesslevelId")
    if (storedAccess == 1) {
        setIsAdmin(true)
    }
    else {
      setIsAdmin(false)
    }
  },[])

  //Logout napin tapahtumankäsittelijä
  const logout = () => {
    localStorage.clear()
    setIsPositive(true)
    setLoggedInUser('')
    setMessage('Logout was successfull.')
    setShowMessage(true)
    setTimeout(()=>{
      setShowMessage(true)
      setMessage('See you soon!')
    },500)
    setTimeout(()=>{
      setShowMessage(false)
    },1000)
  }

  return (
    <div className="App">

      
{!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} setIsAdmin={setIsAdmin} />}
{!loggedInUser && showMessage && <Message message={message} isPositive={isPositive}/>}


{loggedInUser &&
      <Router>

      <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
      <Nav.Link href='/Customers' className='nav-link'>Customers</Nav.Link>
      <Nav.Link href='/Laskuri' className='nav-link'>Laskuri</Nav.Link>
      <Nav.Link href='/Posts' className='nav-link'>Posts</Nav.Link>
      {isAdmin && <Nav.Link href='/Users' className='nav-link'>Users</Nav.Link>}
      <Nav.Link href='/Products' className='nav-link'>Products</Nav.Link>
      <button onClick={() => logout()}>Logout</button>

      {/*<Link to={'/Customers'} className='nav-link'>Customers</Link>
      <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
      <Link to={'/Posts'} className='nav-link'>Typicode Posts</Link>
      {isAdmin && <Link to={'/Users'} className='nav-link'>Users</Link>}
      <Link to={'/Products'} className='nav-link'>Products</Link>
<button onClick={() => logout()}>Logout</button>*/}
      </Nav>
      </Navbar>
      
      <h2>Northwind Traders</h2>

      {showMessage && <Message message={message} isPositive={isPositive} />}


      <Switch>
                <Route path="/Customers"> <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>

                {isAdmin && <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>}

                <Route path="/Products"> <ProductList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>
  
                <Route path="/Laskuri"> <Laskuri /></Route>
                <Route path="/Posts"> <Posts /></Route>

          </Switch>

      </Router>
      }
    </div>
  );
}

export default App;
