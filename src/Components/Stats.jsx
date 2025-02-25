export default function Stats({ scooters }) {

    let totalDistance = 0;
    scooters.forEach(element => totalDistance = totalDistance + parseFloat(element.totalRideKilometres));


    return (
        <>
            <div className="stats">
                <hr /><p><span>Iš viso paspirtukų: <span className="stat">{scooters.length}</span>;</span> <span className='stat-gap' style={{ width: '15px', display: "inline-block" }}></span> <span>Bendras nuvažiuotas atstumas: <span className="stat">{totalDistance}</span></span>
                </p><hr />
            </div >
        </>

    )
}