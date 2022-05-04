import './App.css';
import React, {useState} from 'react';

//Propsi otettu vastaan suoraan nimellä "huomio"
const Laskuri = ({huomio}) => {

//Komponentin tilan määritys
const [luku, setLuku] = useState(0)
const [clear, setClear]=useState(false);

  return (
    <>
        <h3>{luku}</h3>
        <button onClick={() => setLuku(luku +1)}>+</button>

        <button onClick={() => setLuku(luku -1)}>-</button>

        <button onClick={() => setLuku(luku === 0)}>C</button>

        <button onClick={huomio}>huomio</button>
    </>
  );
}

export default Laskuri;