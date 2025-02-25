
import './App.scss';
import './buttons.scss';
import { useEffect, useRef, useState } from 'react';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';
import Stats from './Components/Stats';
import Messages from './Components/Messages';





function App() {

  const [scooters, setScooters] = useState(JSON.parse(localStorage.getItem('scooters')) || []);
  const [scooterEdit, scooterEditSet] = useState(null);
  const idn = useRef(JSON.parse(localStorage.getItem('id')) || 0);
  const [message, setMessage] = useState('');




  useEffect(_ => {
    localStorage.setItem('scooters', JSON.stringify(scooters));
    localStorage.setItem('id', JSON.stringify(idn.current));
    console.log('išsaugota')

  }, [scooters])


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1><span style={{ color: 'cyan' }}>'Kolt'</span> paspirtukų nuoma!</h1>
          <Stats scooters={scooters} />
          <Create setScooters={setScooters} scooters={scooters} idn={idn} setMessage={setMessage} />

          <List scooters={scooters} setScooters={setScooters} scooterEditSet={scooterEditSet} />
        </div>
      </header>
      <Edit scooterEdit={scooterEdit} scooterEditSet={scooterEditSet} setScooters={setScooters} scooters={scooters} setMessage={setMessage} />
      <Messages message={message} />
    </div>
  );
}

export default App;
