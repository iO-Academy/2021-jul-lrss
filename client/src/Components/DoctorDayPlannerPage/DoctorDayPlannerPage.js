import React, {useEffect, useState} from "react";
import AppointmentOverview from "../DoctorAppointmentPage/AppointmentOverview";
import {forEach} from "react-bootstrap/ElementChildren";


const DoctorDayPlannerPage = () => {
    const [dateSelected, setDateSelected] = useState('01/11/2021')
    const [dayOverview, setDayOverview] = useState('')
        console.log(dateSelected)
        useEffect (() => {
        const url = 'http://localhost:3001/get-appointments'
        // const requestOptions = {
        //     headers: {'Content-Type': 'application/json'},
        //     mode: 'cors'
        // };

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const appointments = data.filter(appointment => {
                        if (appointment.date === dateSelected) {
                            return appointment
                        }
                    })
                console.log(appointments)
                setDayOverview(appointments)
            })

    }, []);

    return (
        <div>
            <h1>{dateSelected}</h1>
                <AppointmentOverview setDateSelected={setDateSelected}/>
                <div className="dayOverview">
                    {dayOverview.map(appointment => {
                    return <p>{appointment.name}</p>
                })}
                </div>
        </div>
//view of the calendar to choose the day
        //default to current day
        //patients name
        //appointment time
        //reason for appointment on clicking on the appointment
        //blank spaces for unbooked appointments
    )

}

export default DoctorDayPlannerPage