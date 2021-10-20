import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import './PatientBookingPage.css'
import 'react-day-picker/lib/style.css';
import DatePicker from "../DatePicker/DatePicker";
import AppointmentSelector from "../AppointmentSelector/AppointmentSelector";
import DoctorSelector from "../DoctorSelector/DoctorSelector";
import ConfirmAppointmentModal from "../ConfirmAppointmentModal/ConfirmAppointmentModal";
import ReasonForVisitTextArea from "../ReasonForVisitTextArea/ReasonForVisitTextArea";



const PatientBookingPage = () => {
    const [doctorSelected, setDoctorSelected] = useState('')
    const [dateSelected, setDateSelected] = useState('')
    const [appointmentSelected, setAppointmentSelected] = useState({string: '', timeSlot: 0})
    const [reasonForVisit, setReasonForVisit] = useState('')

    useEffect(() => {
        setAppointmentSelected({string: '', timeSlot: 0})
    }, [doctorSelected, dateSelected])

    return (
        <main className="d-flex justify-content-center align-items-center text-center vh-100">
            <Form className="col-8">
                <h1>Book an Appointment</h1>
                <DoctorSelector setDoctorSelected={setDoctorSelected}/>
                <DatePicker setDateSelected={setDateSelected}/>
                <AppointmentSelector
                    doctorSelected={doctorSelected}
                    dateSelected={dateSelected}
                    appointmentSelected={appointmentSelected}
                    setAppointmentSelected={setAppointmentSelected}/>
                <ReasonForVisitTextArea
                    appointmentSelected={appointmentSelected}
                    reasonForVisit={reasonForVisit}
                    setReasonForVisit={setReasonForVisit}/>
                <ConfirmAppointmentModal
                    doctorSelected={doctorSelected}
                    dateSelected={dateSelected}
                    appointmentSelected={appointmentSelected}
                    reasonForVisit={reasonForVisit}/>
            </Form>
        </main>
    )
}

export default PatientBookingPage