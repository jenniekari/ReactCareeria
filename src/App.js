import React, {useState} from 'react';
import './App.css';
import Laskuri from './Laskuri';
import Posts from './Posts';
import Viesti from './Viesti';

const App = () => {

  // App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false) //boolean

  const huomio = () => {
    alert("Huomio!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <hi>Hello from React!</hi>
        <p></p>

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
