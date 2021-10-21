import React, {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import DatePicker from "../DatePicker/DatePicker";
import './DoctorDayPlannerPage.css'

const DoctorDayPlannerPage = () => {
    const [dateSelected, setDateSelected] = useState(new Date())
    // const [appointmentDetails, setAppointmentDetails] = useState([])
    const [dayOverview, setDayOverview] = useState(
        {
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {}
        }
    )

    const displayTimeSlot = (time_slot) => {
        switch (time_slot){
            case 1:
                return '09:00 am'
            case 2:
                return '10:00 am'
            case 3:
                return '11:00 am'
            case 4:
                return '12:00 noon'
            case 5:
                return '13:00 pm'
            case 6:
                return '14:00 pm'
            case 7:
                return '15:00 pm'
            case 8:
                return '16:00 pm'
            default:
                return 'none'
        }
    }
    var appointments = []

    useEffect( () => {
        const url = 'http://localhost:3001/get-doctor-appointments-for-day'
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                doctorID: 3,
                date: (dateSelected === '' ? new Date().toLocaleDateString() : dateSelected.toLocaleDateString())
            })
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                    const appointmentData = {
                        1: {},
                        2: {},
                        3: {},
                        4: {},
                        5: {},
                        6: {},
                        7: {},
                        8: {}
                    }
                    data.forEach(appointment => {
                        appointmentData[appointment.time_slot] = appointment
                    })
                    setDayOverview(appointmentData)
                }
            })
            .catch(error => console.log(error))
    }, [dateSelected])

    return (
        <div>
            <DatePicker setDateSelected={setDateSelected}/>
                <table>
                    <tableRow dayOverview={dayOverview} displayTimeSlot={displayTimeSlot}/>
                </table>
        </div>
    )
}

export default DoctorDayPlannerPage