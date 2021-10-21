import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import './PatientBookingPage.css'
import 'react-day-picker/lib/style.css';
import DatePicker from "../DatePicker/DatePicker";
import AppointmentSelector from "../AppointmentSelector/AppointmentSelector";
import DoctorSelector from "../DoctorSelector/DoctorSelector";
import ConfirmAppointmentModal from "../ConfirmAppointmentModal/ConfirmAppointmentModal";
import ReasonForVisitTextArea from "../ReasonForVisitTextArea/ReasonForVisitTextArea";
import {Button} from "react-bootstrap";



const PatientBookingPage = () => {
    const [doctorSelected, setDoctorSelected] = useState({name: '', id: 0})
    const [dateSelected, setDateSelected] = useState('')
    const [appointmentSelected, setAppointmentSelected] = useState({string: '', timeSlot: 0})
    const [reasonForVisit, setReasonForVisit] = useState('')
    const [appointmentBooked, setAppointmentBooked] = useState(false)

    const handleClick = evt => {
        evt.preventDefault()
    }

    useEffect(() => {
        setAppointmentSelected({string: '', timeSlot: 0})
    }, [doctorSelected, dateSelected])

    useEffect(() => {
        if (appointmentBooked){
          //
        }
    }, [appointmentBooked])

    return (
        <main className="d-flex justify-content-center align-items-center text-center vh-100">
            <Form className="col-8">
                <div className="d-flex flex-row flex-nowrap justify-content-between mb-3">
                    <h1 className="">LRSS Health</h1>
                    <a className="btn btn-secondary m-0" href="/profile">Back to Profile</a>
                </div>
                <div>
                    <DoctorSelector setDoctorSelected={setDoctorSelected} />
                    <DatePicker setDateSelected={setDateSelected} />
                    <AppointmentSelector
                        doctorSelected={doctorSelected}
                        dateSelected={dateSelected}
                        appointmentSelected={appointmentSelected}
                        setAppointmentSelected={setAppointmentSelected} />
                    <ReasonForVisitTextArea
                        appointmentSelected={appointmentSelected}
                        reasonForVisit={reasonForVisit}
                        setReasonForVisit={setReasonForVisit} />
                    <ConfirmAppointmentModal
                        doctorSelected={doctorSelected}
                        dateSelected={dateSelected}
                        appointmentSelected={appointmentSelected}
                        reasonForVisit={reasonForVisit}
                        setAppointmentBooked={setAppointmentBooked}/>
                </div>
            </Form>
        </main>
    )
}

export default PatientBookingPage