//Kiekvienas paspirtukas turi turėti savo vizualiai atskirtą aprašą 
// (eilutę), kuriame būtų pateikta visa informaciją apie jį. 

// Šalia turi būti mygtukas “Trinti”, 
// kurį paspaudus atitinkamo paspirtuko įrašas būtų pašalinamas iš localStorage.

// Šalia turi būti mygtukas “Redaguoti”, 
// kurį paspaudus atitinkamo paspirtuko įrašas būtų atvaizduojamas modal lange su galimybe jį redaguoti, o redaguotą įrašą išsaugoti  localStorage. 


export default function List({ scooters, setScooters, scooterEditSet }) {

    // const [sort, dispatch] = useReducer(reducer, initialArg, init)

    const deleteScooter = (e, regCode) => {
        console.log(e.target, regCode)
        setScooters(s => s.filter(sct => sct.registrationCode !== regCode))


    }

    const editScooter = code => {

        const scooter = scooters.find((el) => el.registrationCode === code)
        console.log(scooter);
        scooterEditSet(_ => scooter)


    }
    const doSort = e => {
        if (e.target.name === 'km') {
            console.log(scooters);
            setScooters(s => s.toSorted((a, b) => a.totalRideKilometres - b.totalRideKilometres))
            console.log('distavnce')
            console.log(scooters);
        } else if (e.target.name === 'date') {
            setScooters(s => s.toSorted((a, b) => Date.parse(a.lastUseTime) - Date.parse(b.lastUseTime)));
            console.log('data', Date.parse(scooters[1].lastUseTime));
            console.log(scooters);

        } else {
            console.log('laba diena')
        }
    }




    return (
        <div className="list">
            <div><h2>Esantys paspirtukai:</h2></div>
            <div className="sort-btns">
                <button className="btn" onClick={doSort} name="km">Pagal kilometrus</button>
                <button className="btn" onClick={doSort} name="date">Pagal naudojimo datą</button>
            </div>

            <div className="ListItemsContainer">
                {scooters.map((s) =>
                    <div key={s.registrationCode} className="listItem">
                        <span className="list-id">{s.id}</span>

                        <div>Reg. nr.: <span>{s.registrationCode}</span></div>
                        <div>Užimtumas: <span>{s.isBusy === 0 ? 'laisvas(0)' : 'užimtas(1)'}</span></div>
                        <div>Paskutinį kart naudotas: <span>{s.lastUseTime}</span></div>
                        <div>Nuvažiuota: <span>{s.totalRideKilometres}</span> km.</div>
                        <div className="list-btns">
                            <button className="btn" onClick={_ => editScooter(s.registrationCode)}>Koreguoti</button>
                            <button className="btn" onClick={e => deleteScooter(e, s.registrationCode)}>Trinti</button>
                        </div>


                    </div>


                )}
            </div>

        </div >

    )
}