import React, {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import DatePicker from "../DatePicker/DatePicker";
import './DoctorDayPlannerPage.css'

const DoctorDayPlannerPage = () => {
    const [dateSelected, setDateSelected] = useState(new Date())
    // const [appointmentDetails, setAppointmentDetails] = useState([])
    const [dayOverview, setDayOverview] = useState(
        [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ]
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
                    const appointment1 = data.filter(appointment => appointment.time_slot === 1)
                    const appointment2 = data.filter(appointment => appointment.time_slot === 2)
                    const appointment3 = data.filter(appointment => appointment.time_slot === 3)
                    const appointment4 = data.filter(appointment => appointment.time_slot === 4)
                    const appointment5 = data.filter(appointment => appointment.time_slot === 5)
                    const appointment6 = data.filter(appointment => appointment.time_slot === 6)
                    const appointment7 = data.filter(appointment => appointment.time_slot === 7)
                    const appointment8 = data.filter(appointment => appointment.time_slot === 8)
                    const appointments = [
                        appointment1,
                        appointment2,
                        appointment3,
                        appointment4,
                        appointment5,
                        appointment6,
                        appointment7,
                        appointment8
                    ]
                    setDayOverview(appointments)
                }
            })
            .catch(error => console.log(error))
    }, [dateSelected])

    // useEffect(() => {
    //    if(dayOverview[0].doctor !== '') {
    //
    //        let appointmentSlot1 = ''
    //            dayOverview.forEach(appointment => {
    //            if (appointment.time_slot == 1) {
    //                appointmentSlot1 = appointment.patient
    //            }
    //        })
    //    }
    // }, [dayOverview])

    return (
        <div>
            <DatePicker setDateSelected={setDateSelected}/>
            <div>
                <p>{dayOverview[0].patient}</p>
                {/*<table>*/}
                {/*    <tr>*/}
                {/*        <td>9:00</td>*/}
                {/*        <td>{appointmentDetails[0]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>10:00</td>*/}
                {/*        <td>{appointmentDetails[1]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>11:00</td>*/}
                {/*        <td>{appointmentDetails[3]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>12:00</td>*/}
                {/*        <td>{appointmentDetails[4]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>13:00</td>*/}
                {/*        <td>{appointmentDetails[5]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>14:00</td>*/}
                {/*        <td>{appointmentDetails[6]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>15:00</td>*/}
                {/*        <td>{appointmentDetails[7]}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>16:00</td>*/}
                {/*        <td>{getAppointmentDetails(8)}</td>*/}
                {/*        <p>reason for visit</p>*/}
                {/*    </tr>*/}
                {/*</table>*/}
            </div>
        </div>
    )
}

export default DoctorDayPlannerPage