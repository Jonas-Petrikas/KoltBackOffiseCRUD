// Paspirtukų aprašo viršuje (arba apačioje arba šone) turi būti 
// atvaizduota tuščia forma su naujam paspirtukui įvesti skirtais 
// laukeliais ir mygtukas “Pridėti” formos vykdymui. 

// Laukeliui isBusy skirto įvedimo, kuriant naują paspirtuką daryti nereikia, 
// nes naujai sukurtas paspirtukas visada turi būti “laisvas”. 
// registrationCode reikšmė turi būti sukuriama rand kodo, 
// o ne įvedinėjama.
import randomStr from "../Functions/randomStr";
import { useState } from "react";


export default function Create({ setScooters, idn, scooters, setMessage }) {



    const [newScooter, setNewScooter] = useState({ id: idn.current + 1, registrationCode: randomStr(8), isBusy: 0, lastUseTime: new Date().toISOString().split('T')[0], totalRideKilometres: 0 })
    const handleInput = e => {
        setNewScooter({ ...newScooter, [e.target.name]: e.target.value })

    }

    const saveNewScooter = _ => {
        const timeToToday = new Date().getTime() - new Date(newScooter.lastUseTime).getTime();
        if (newScooter.totalRideKilometres > 0 && timeToToday >= 0 && timeToToday <= 2592000000) {
            idn.current++;
            console.log(newScooter);
            setScooters(s => [...s, { ...newScooter, totalRideKilometres: parseFloat(newScooter.totalRideKilometres).toFixed(2) }])
            setNewScooter({ ...newScooter, id: idn.current + 1, registrationCode: randomStr(8), isBusy: 0, lastUseTime: new Date().toISOString().split('T')[0], totalRideKilometres: 0 });
        } else if (newScooter.totalRideKilometres <= 0) {
            setMessage('Atstumas turi būti didesnis nei 0 km')
            setTimeout(_ => {
                setMessage('')
            }, 3000)
        } else if (timeToToday < 0) {
            setMessage('Data negali būti ateityje')
            setTimeout(_ => {
                setMessage('')
            }, 3000)
        } else if (timeToToday > 2592000000) {
            setMessage('Paskutinis naudojimas negali būti senesnis nei 30 d.')
            setTimeout(_ => {
                setMessage('')
            }, 3000)
        }


    }


    return (
        <div className="createForm">
            <div><h2>Pridėti naują paspirtuką:</h2></div>

            <div className='createLine'><span>Eilės numeris: </span> <span className="busy">{newScooter.id} </span></div>
            <div className='createLine'><span>Registracijos kodas: </span> <span className="busy">{newScooter.registrationCode}</span>  </div>
            <div className='createLine'><span>Užimtumas: </span> <span className="busy"> laisvas (0)</span></div>
            <div className='createLine'><span>Paskutinis naudojimas: </span> <input type='date' name='lastUseTime' onChange={handleInput} value={newScooter.lastUseTime} /></div>
            <div className='createLine'><span>Nuvažiuota kilometrų: </span><input name="totalRideKilometres" onChange={handleInput} value={newScooter.totalRideKilometres} /></div>


            <button className="btn" onClick={saveNewScooter}>Pridėti</button>
        </div >

    )
}