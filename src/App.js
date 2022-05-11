import React, {useState} from 'react';
import './App.css';
import Laskuri from './Laskuri';
import Posts from './Posts';
import Viesti from './Viesti';
import CustomerList from './CustomerList';
import Message from './Message';

const App = () => {

  //App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false) //boolean

  //Statet messgaen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)


  const huomio = () => {
    alert("Huomio!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <hi>Hello from React!</hi>

        {/*Kaikki muu on html, paitsi curly brackettien sisällä on javascriptiä. Kuten tämä ja alla oleva!*/}
        {showMessage && <Message message={message} isPositive={isPositive}/>}

        <p></p>

        <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>

        {/*jos showlaskuri on tosi, näytä laskuri.*/}
        {showLaskuri && <Laskuri huomio={huomio}/>}
        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        <Viesti teksti="Tervehdys app komponentista!"></Viesti>

        <Posts></Posts>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
