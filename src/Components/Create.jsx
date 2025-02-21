// Paspirtukų aprašo viršuje (arba apačioje arba šone) turi būti 
// atvaizduota tuščia forma su naujam paspirtukui įvesti skirtais 
// laukeliais ir mygtukas “Pridėti” formos vykdymui. 

// Laukeliui isBusy skirto įvedimo, kuriant naują paspirtuką daryti nereikia, 
// nes naujai sukurtas paspirtukas visada turi būti “laisvas”. 
// registrationCode reikšmė turi būti sukuriama rand kodo, 
// o ne įvedinėjama.
import randomStr from "../Functions/randomStr";
import { useState, useEffect } from "react";


export default function Create({ setScooters, scooters, idn }) {


    const [newScooter, setNewScooter] = useState({ id: idn.current + 1, registrationCode: randomStr(8), isBusy: 0, lastUseTime: new Date().toISOString().split('T')[0], totalRideKilometres: 0 })
    const handleInput = e => {
        setNewScooter({ ...newScooter, [e.target.name]: e.target.value })
    }

    const saveNewScooter = _ => {
        idn.current++;
        console.log(newScooter);
        setScooters(s => [...s, newScooter])

    }

    useEffect(_ => {
        setNewScooter({ ...newScooter, id: idn.current + 1, registrationCode: randomStr(8), isBusy: 0, lastUseTime: new Date().toISOString().split('T')[0], totalRideKilometres: 0 });

    }, [scooters])
    return (
        <div className="createForm">
            <div><h2>Pridėti naują paspirtuką:</h2></div>

            <div className='createLine'><span>id:</span> <input name='id' onChange={handleInput} value={newScooter.id} /></div>
            <div className='createLine'><span>Registracijos kodas:</span> <input name='registrationCode' onChange={handleInput} value={newScooter.registrationCode} /></div>
            <div className='createLine'><span>isBusy:</span> <span className="busy"> 0 (LAISVAS)</span></div>
            <div className='createLine'><span>Paskutinis naudojimas:</span> <input type='date' name='lastUseTime' onChange={handleInput} value={newScooter.lastUseTime} /></div>
            <div className='createLine'><span>Nuvažiuota kilometrų: </span><input name="totalRideKilometres" onChange={handleInput} value={newScooter.totalRideKilometres} /></div>


            <button className="btn" onClick={saveNewScooter}>Pridėti</button>
        </div >

    )
}