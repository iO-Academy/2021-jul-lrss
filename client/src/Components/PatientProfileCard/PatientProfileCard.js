import React, {useEffect, useState} from "react";
import ConfirmCancelModal from "../ConfirmCancelModal/ConfirmCancelModal";

const PatientProfileCard = (props) => {

    const [userData, setUserData] = useState(
        {
            name: '',
            dob: '',
            gender: '',
            email: '',
            mobile: '',
    })

    const [appointmentData, setAppointmentData] = useState(
        {
            id: 0,
            doctor: '',
            date: '',
            time_slot: 0
    })

    useEffect(() => {
        const patientUrl = 'http://localhost:3001/get-patient'
        const patientRequestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        fetch(patientUrl, patientRequestOptions)
            .then(response => response.json())
            .then(data => {
                setUserData(data[0])
            })
            .catch()

        const appointmentsUrl = 'http://localhost:3001/get-patient-appointments'
        const appointmentRequestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        fetch(appointmentsUrl, appointmentRequestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0){
                    setAppointmentData(data[0])
                }
            })
            .catch()
    }, [])

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

    const editProfile = evt => {
        evt.preventDefault()
    }

    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div className=" image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary" onClick={editProfile}>
                        <img src="https://i.imgur.com/wvxPV9S.png" alt="" height="100" width="100"/>
                    </button>
                    <span className="name mt-3">{userData.name}</span>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span className="text-muted">{appointmentData.id === 0 ? 'No Appointment Booked' : 'Appointment Booked'}</span>
                    </div>
                    <div className={"d-flex flex-column mt-3 text-center" + (appointmentData.id !== 0 ? '' : ' d-none')}>
                        <h5 className="m-0">You have an appointment with {appointmentData.doctor ?? ''}</h5>
                        <h5>at {displayTimeSlot(appointmentData.time_slot)} on {appointmentData.date ?? ''}</h5>
                        <ConfirmCancelModal
                            appointmentData={appointmentData}
                            setAppointmentData={setAppointmentData}/>
                    </div>
                    <div className={"mt-3" + (appointmentData.id !== 0 ? ' d-none' : '')}>
                        <a className="btn btn-primary" href="/book-appointment">Book Appointment</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientProfileCard