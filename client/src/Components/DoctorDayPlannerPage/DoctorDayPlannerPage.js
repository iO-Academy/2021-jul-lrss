import React, {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import DatePicker from "../DatePicker/DatePicker";
import './DoctorDayPlannerPage.css'
import ConfirmAppointmentModal from "../ConfirmAppointmentModal/ConfirmAppointmentModal";
import AppointmentInfoModal from "./AppointmentInfoModal";
import {Button} from "react-bootstrap";
import TableRow from "./TableRow";

const DoctorDayPlannerPage = () => {
    const [dateSelected, setDateSelected] = useState(new Date())
    const [moduleDisplay, setModuleDisplay] = useState(false)
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

    const initialStateDayOverview = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {}
    }

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

    const toggleDisplay = () => {
        if (moduleDisplay){
            setModuleDisplay(false)
        } else {
            setModuleDisplay(true)
        }
    }

    const handleClick = evt => {
        evt.preventDefault()
        toggleDisplay()
    }


    useEffect( () => {
        setDayOverview(initialStateDayOverview)
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
            <div>
                <DatePicker setDateSelected={setDateSelected}/>
            </div>
            {/*<table>*/}
            {/*        <tr>*/}
            {/*            <td>09:00</td>*/}
            {/*            <td>{dayOverview[1].patient ? dayOverview[1].patient : ''}</td>*/}
            {/*            <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}*/}
            {/*                timeSlot={displayTimeSlot(dayOverview[1].time_slot)}*/}
            {/*                name={dayOverview[1].patient ? dayOverview[1].patient : ''}*/}
            {/*                reasonForVisit={dayOverview[1].reason_for_visit ? dayOverview[1].reason_for_visit : ''}*/}
            {/*                dob={dayOverview[1].patient_dob ? dayOverview[1].patient_dob : ''}*/}
            {/*                gender={dayOverview[1].patient_gender ? dayOverview[1].patient_gender : ''}*/}
            {/*            />*/}
            {/*        </tr>*/}
            {/*</table>*/}

            {
                dayOverview.forEach(appointment => {
                <table>
                    <TableRow appointment={appointment} displayTimeSlot={displayTimeSlot} moduleDisplay={moduleDisplay} />
                </table>
            })
            }

        </div>
    )
}

export default DoctorDayPlannerPage