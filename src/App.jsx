
import './App.scss';
import './buttons.scss';
import { useEffect, useState } from 'react';
import Create from './Components/Create';
import List from './Components/List';
import randomStr from './Functions/randomStr';
import Edit from './Components/Edit';





function App() {

  const [scooters, setScooters] = useState(JSON.parse(localStorage.getItem('scooters')) || []);
  const [scooterEdit, scooterEditSet] = useState(null);
  useEffect(_ => {
    localStorage.setItem('scooters', JSON.stringify(scooters));
    console.log('išsaugota')
  }, [scooters])


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1><span style={{ color: 'cyan' }}>'Kolt'</span> pasipirtukų nuoma!</h1>
          <Create setScooters={setScooters} scooters={scooters} />
          <List scooters={scooters} setScooters={setScooters} scooterEditSet={scooterEditSet} />
        </div>
      </header>
      <Edit scooterEdit={scooterEdit} scooterEditSet={scooterEditSet} setScooters={setScooters} scooters={scooters} />
    </div>
  );
}

export default App;
