import React, {useEffect, useState} from "react";
import {FormGroup} from "react-bootstrap";

const AppointmentSelector = (props) => {

    const [disabled, setDisabled] = useState(true)
    const [appointmentsTaken, setAppointmentsTaken] = useState(
        {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false
        })

    useEffect(() => {
        if (props.doctorSelected.id !== 0 && props.dateSelected !== ''){
            setDisabled(false)
            const url = 'http://localhost:3001/get-appointments'
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    doctor: props.doctorSelected.id,
                    date: props.dateSelected.toLocaleDateString()
                })
            }
            fetch(url, requestOptions)
                .then(response => {
                    return response.json()
                }).then(takenAppointments => {
                    const appointmentArray= {
                        1: false,
                        2: false,
                        3: false,
                        4: false,
                        5: false,
                        6: false,
                        7: false,
                        8: false
                    }
                    takenAppointments.forEach(takenAppointment => {
                        appointmentArray[takenAppointment.time_slot] = true
                    })
                    setAppointmentsTaken(appointmentArray)
            }).catch(error => {
                console.log('Something went wrong: ', error)
            })
        } else {
            setDisabled(true)
        }
    }, [props.doctorSelected, props.dateSelected])

    const handleSelect = evt => {
        props.setAppointmentSelected({string: evt.target.options[evt.target.selectedIndex].textContent, timeSlot: evt.target.selectedIndex})
    }

    return (
        <FormGroup className="form-floating">
            <select className="form-control" id="appointmentSelector" disabled={disabled} onChange={handleSelect}
                    value={props.appointmentSelected.timeSlot}>
                <option value=''> </option>
                <option value={1} disabled={appointmentsTaken[1]}>9:00 - 10:00</option>
                <option value={2} disabled={appointmentsTaken[2]}>10:00 - 11:00</option>
                <option value={3} disabled={appointmentsTaken[3]}>11:00 - 12:00</option>
                <option value={4} disabled={appointmentsTaken[4]}>12:00 - 13:00</option>
                <option value={5} disabled={appointmentsTaken[5]}>13:00 - 14:00</option>
                <option value={6} disabled={appointmentsTaken[6]}>14:00 - 15:00</option>
                <option value={7} disabled={appointmentsTaken[7]}>15:00 - 16:00</option>
                <option value={8} disabled={appointmentsTaken[8]}>16:00 - 17:00</option>
            </select>
            <label htmlFor="appointmentSelector">Select an Appointment</label>
        </FormGroup>
    )
}

export default AppointmentSelector