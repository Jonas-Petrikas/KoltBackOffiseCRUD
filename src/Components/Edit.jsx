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

export default function Edit({ scooterEdit, scooterEditSet, setScooters, scooters, setMessage }) {

    const [newData, newDataSet] = useState({ date: new Date().toISOString().split('T')[0], distance: 0 })



    const checkChange = _ => {
        scooterEditSet(s => s.isBusy === 0 ? { ...s, isBusy: 1 } : { ...s, isBusy: 0 })
        console.log(scooterEdit);
    };


    const closeReset = _ => {
        scooterEditSet(s => s = null);
        newDataSet({ ...newData, date: new Date().toISOString().split('T')[0], distance: 0 })
    }

    const saveEditScooter = _ => {
        const timeToLastUse = new Date(newData.date).getTime() - new Date(scooterEdit.lastUseTime).getTime()
        const timeToToday = new Date().getTime() - new Date(newData.date).getTime();;
        if (newData.distance > 0 && timeToLastUse >= 0 && timeToToday >= 0 && timeToToday <= 2592000000) {

            console.log(scooterEdit);
            setScooters(s => [...s.filter(sct => sct.registrationCode !== scooterEdit.registrationCode), {
                ...scooterEdit,
                lastUseTime: newData.date,
                totalRideKilometres: (parseFloat(scooterEdit.totalRideKilometres) + parseFloat(newData.distance)).toFixed(2)
            }
            ]);
            newDataSet({ ...newData, date: new Date().toISOString().split('T')[0], distance: 0 });
            scooterEditSet(null);
        } else if (newData.distance <= 0) {
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
        } else if (timeToLastUse < 0) {
            setMessage('Naudojimo data negali būti senesnė nei buvusi prieš tai')
            setTimeout(_ => {
                setMessage('')
            }, 3000)
        }
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
                    <div className='createLine'><span>Bendrai nuvažiuota kilometrų: {scooterEdit === null ? '' : (parseFloat(scooterEdit.totalRideKilometres) + (parseFloat(newData.distance) || 0)).toFixed(2)} </span>
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