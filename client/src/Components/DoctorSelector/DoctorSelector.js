import React, {useEffect, useState} from "react";
import {FormGroup} from "react-bootstrap";

const DoctorSelector = (props) => {

    const [allDoctors, setAllDoctors] = useState([])

    useEffect(() => {
        // get data from api to populate doctor drop down selector
        setAllDoctors(JSON.parse('[{"id":"1", "name":"Dr Test MBalls"}, {"id":"2", "name":"Dr Phil"}]'))
    }, [])

    const handleSelect = evt => {
        props.setDoctorSelected(evt.target.value)
    }

    return (
        <FormGroup className="form-floating">
            <select onChange={handleSelect} className="form-control" id="drSelector">
                <option key="0" value=""> </option>
                {allDoctors.map(doctor =>
                    <option key={doctor.id}>{doctor.name}</option>
                )}
            </select>
            <label htmlFor="drSelector">Select a Doctor</label>
        </FormGroup>
    )
}

export default DoctorSelector