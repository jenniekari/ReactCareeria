import './App.css';
import React, {useState} from 'react';

//Propsi otettu vastaan suoraan nimellä "huomio"
const Laskuri = () => {

//Komponentin tilan määritys
const [luku, setLuku] = useState(0)
//const [clear, setClear]=useState(false);

  return (
    <>
        <h3>{luku}</h3>
        <button onClick={() => setLuku(luku +1)}>+</button>

        <button onClick={() => setLuku(luku -1)}>-</button>

        <button onClick={() => setLuku(0)}>Reset</button>

        {/*<button onClick={huomio}>huomio</button> muutos eli ei ota vastaa propseja*/}
    </>
  );
}

export default Laskuri;