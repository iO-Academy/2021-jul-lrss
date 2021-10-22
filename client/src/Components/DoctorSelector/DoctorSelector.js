import React, {useEffect, useState} from "react";
import {FormGroup} from "react-bootstrap";

const DoctorSelector = (props) => {

    const [allDoctors, setAllDoctors] = useState([])

    useEffect(() => {
        const url = 'http://localhost:3001/get-doctors'
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {setAllDoctors(data)})
            .catch(error => { console.log('Something went wrong: ', error)})
    }, [])

    const handleSelect = evt => {
        props.setDoctorSelected({name: evt.target.options[evt.target.selectedIndex].textContent, id: parseInt(evt.target.value)})
    }

    return (
        <FormGroup className="form-floating">
            <select onChange={handleSelect} className="form-control" id="drSelector">
                <option key={0} value={0}> </option>
                {allDoctors.map(doctor =>
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                )}
            </select>
            <label htmlFor="drSelector">Select a Doctor</label>
        </FormGroup>
    )
}

export default DoctorSelector