import React, {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import DatePicker from "../DatePicker/DatePicker";
import './DoctorDayPlannerPage.css'
import ConfirmAppointmentModal from "../ConfirmAppointmentModal/ConfirmAppointmentModal";
import AppointmentInfoModal from "./AppointmentInfoModal";
import {Button, Form} from "react-bootstrap";
import TableRow from "./TableRow";
import LogoutButton from "../LogoutButton/LogoutButton";

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
                return '01:00 pm'
            case 6:
                return '02:00 pm'
            case 7:
                return '03:00 pm'
            case 8:
                return '04:00 pm'
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
        <div className="d-flex flex-column flex-nowrap mx-3 bg-light vh-75 align-middle">
            <h1 className="text-center mb-3">LRSS Health</h1>
            <div className="d-flex flex-row flex-wrap mx-3 justify-content-center">
                <DatePicker setDateSelected={setDateSelected}/>
                <table className="mx-5">
                    <tr className="card-title"><h3 className="text-center">Day Planner</h3></tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>09:00</td>
                        <td>{dayOverview[1].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                            timeSlot={displayTimeSlot(dayOverview[1].time_slot)}
                            name={dayOverview[1].patient ? dayOverview[1].patient : ''}
                            reasonForVisit={dayOverview[1].reason_for_visit ? dayOverview[1].reason_for_visit : ''}
                            dob={dayOverview[1].patient_dob ? dayOverview[1].patient_dob : ''}
                            gender={dayOverview[1].patient_gender ? dayOverview[1].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>10:00</td>
                        <td>{dayOverview[2].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[2].time_slot)}
                                              name={dayOverview[2].patient ? dayOverview[2].patient : ''}
                                              reasonForVisit={dayOverview[2].reason_for_visit ? dayOverview[2].reason_for_visit : ''}
                                              dob={dayOverview[2].patient_dob ? dayOverview[2].patient_dob : ''}
                                              gender={dayOverview[2].patient_gender ? dayOverview[2].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>11:00</td>
                        <td>{dayOverview[3].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[3].time_slot)}
                                              name={dayOverview[3].patient ? dayOverview[3].patient : ''}
                                              reasonForVisit={dayOverview[3].reason_for_visit ? dayOverview[3].reason_for_visit : ''}
                                              dob={dayOverview[3].patient_dob ? dayOverview[3].patient_dob : ''}
                                              gender={dayOverview[3].patient_gender ? dayOverview[3].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>12:00</td>
                        <td>{dayOverview[4].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[4].time_slot)}
                                              name={dayOverview[4].patient ? dayOverview[4].patient : ''}
                                              reasonForVisit={dayOverview[4].reason_for_visit ? dayOverview[4].reason_for_visit : ''}
                                              dob={dayOverview[4].patient_dob ? dayOverview[4].patient_dob : ''}
                                              gender={dayOverview[4].patient_gender ? dayOverview[4].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>13:00</td>
                        <td>{dayOverview[5].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[5].time_slot)}
                                              name={dayOverview[5].patient ? dayOverview[5].patient : ''}
                                              reasonForVisit={dayOverview[5].reason_for_visit ? dayOverview[5].reason_for_visit : ''}
                                              dob={dayOverview[5].patient_dob ? dayOverview[5].patient_dob : ''}
                                              gender={dayOverview[5].patient_gender ? dayOverview[5].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>14:00</td>
                        <td>{dayOverview[6].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[6].time_slot)}
                                              name={dayOverview[6].patient ? dayOverview[6].patient : ''}
                                              reasonForVisit={dayOverview[6].reason_for_visit ? dayOverview[6].reason_for_visit : ''}
                                              dob={dayOverview[6].patient_dob ? dayOverview[6].patient_dob : ''}
                                              gender={dayOverview[6].patient_gender ? dayOverview[6].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>15:00</td>
                        <td>{dayOverview[7].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[7].time_slot)}
                                              name={dayOverview[7].patient ? dayOverview[7].patient : ''}
                                              reasonForVisit={dayOverview[7].reason_for_visit ? dayOverview[7].reason_for_visit : ''}
                                              dob={dayOverview[7].patient_dob ? dayOverview[7].patient_dob : ''}
                                              gender={dayOverview[7].patient_gender ? dayOverview[7].patient_gender : ''}
                        />
                    </tr>
                    <tr className="d-flex flex-row align-items-baseline justify-content-between mb-1">
                        <td>16:00</td>
                        <td>{dayOverview[8].patient ? '' : '-------------'}</td>
                        <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                                              timeSlot={displayTimeSlot(dayOverview[8].time_slot)}
                                              name={dayOverview[8].patient ? dayOverview[8].patient : ''}
                                              reasonForVisit={dayOverview[8].reason_for_visit ? dayOverview[8].reason_for_visit : ''}
                                              dob={dayOverview[8].patient_dob ? dayOverview[8].patient_dob : ''}
                                              gender={dayOverview[8].patient_gender ? dayOverview[8].patient_gender : ''}
                        />
                    </tr>
                </table>
            </div>
            <LogoutButton />
        </div>
    )
}

export default DoctorDayPlannerPage