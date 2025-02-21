export default function Stats({ scooters }) {

    let totalDistance = 0;
    scooters.forEach(element => totalDistance = totalDistance + parseFloat(element.totalRideKilometres));


    return (
        <>
            <div className="stats">
                <hr /><p>Iš viso paspirtukų: <span className="stat">{scooters.length}</span>; <span style={{ width: '15px', display: "inline-block" }}></span> <span style={{ width: '50px' }}> </span>Bendras nuvažiuotas atstumas: <span className="stat">{totalDistance}</span>
                </p><hr />
            </div>
        </>

    )
}