// Redagavimo langas turi atrodyti sekančiai.
// Atvaizduojama registrationCode  reikšmė (neredaguojama). 
// Šalia įrašo su paskutinio naudojimo data (neredaguojama) turi būti tuščias laukelis su naujos datos įvedimu (redaguojama). 
// Šalia laukelio su paspirtuko rida (kilometrais, neredaguojama) turi būti laukelis, 
// kuriame galima būtų įvesti tos dienos paspirtuku nuvažiuotą atstumą. 
// Per dieną nuvažiuoti kilometrai sumuojasi su bendru kiekiu ir suma įrašoma į localStorage. 
// Įrašas iš localStorage laukelio isBusy turi būti paverčiamas į “užimtas” arba “laisvas”, 
// priklausomai nuo laukelio reikšmės. 
// Šalia šio laukelio turi būti checkbox tipo įvedimas, kuris leistų keisti užimtumą. 

// Duomenų redagavimas turi būti atliekamas paspaudus “Saugoti” mygtuką, 
// esantį radagavimo modale. 
// Registracijos kodas (aštuoni rand raidiniai skaitiniai simboliai) neturi būti radaguotinas (įrašomas tik kuriant naują paspirtuką).



import { useState } from "react";

export default function Edit({ scooterEdit, scooterEditSet, setScooters, scooters }) {

    const [newData, newDataSet] = useState({ date: new Date().toISOString().split('T')[0], distance: 0 })


    if (scooterEdit !== null) {
        console.log(scooterEdit.isBusy);
    }


    const checkChange = _ => {
        scooterEditSet(s => s.isBusy === 0 ? { ...s, isBusy: 1 } : { ...s, isBusy: 0 })
        console.log(scooterEdit);
    };


    const closeReset = _ => {
        scooterEditSet(s => s = null);
        newDataSet({ ...newData, date: new Date().toISOString().split('T')[0], distance: 0 })
    }

    const saveEditScooter = _ => {
        scooterEditSet({ ...scooterEdit, lastUseTime: newData.date, totalRideKilometres: parseFloat(scooterEdit.totalRideKilometres) + parseFloat(newData.distance) })
        setScooters(s => {
            setScooters(scooters.filter(sct => sct.registrationCode !== scooterEdit.registrationCode));
            setScooters(s => [...s, scooterEdit])
        })
    }




    return (
        <>
            <div className="modal" style={{ display: (scooterEdit === null ? 'none' : true) }}>
                <div className="edit-container">
                    <div><h2>Redaguoti paspirtuką:</h2></div>

                    <div className='createLine'><span>id: {scooterEdit === null ? '' : scooterEdit.id}</span> </div>
                    <div className='createLine'><span>Registracijos kodas: {scooterEdit === null ? '' : scooterEdit.registrationCode} </span> </div>
                    <div className='createLine'><span>Pasipirtuko užimtumas:</span>
                        <div>
                            <input type="radio" value='Užimtas' onChange={checkChange} name="isBusy" checked={scooterEdit !== null && scooterEdit.isBusy === 1} />Užimtas
                            <input type="radio" value='Laisvas' onChange={checkChange} name="isBusy" checked={scooterEdit !== null && scooterEdit.isBusy === 0} />Laisvas
                        </div>
                    </div>


                    <div className='createLine'><span>Paskutinis naudojimas: {scooterEdit === null ? '' : scooterEdit.lastUseTime}</span>
                        <div>
                            <input type="date" onChange={e => newDataSet({ ...newData, date: e.target.value })} value={newData.date}></input>
                        </div></div>
                    <div className='createLine'><span>Bendrai nuvažiuota kilometrų: {scooterEdit === null ? '' : parseFloat(scooterEdit.totalRideKilometres) + parseFloat(newData.distance) || 0}</span>
                        <div>
                            Paskutinio važiavimo km.: <input type="number" onChange={e => newDataSet({ ...newData, distance: e.target.value })} value={newData.distance} />
                        </div></div>



                    <div className="list-btns">
                        <button className="btn" onClick={saveEditScooter}> Išsaugoti </button>
                        <button className="btn" onClick={closeReset}> Atšaukti </button></div>
                </div>
            </div>
        </>
    )
}