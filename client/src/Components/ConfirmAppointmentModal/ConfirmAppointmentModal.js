import React, {useEffect, useState} from "react";
import {Button, Modal, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

const ConfirmAppointmentModal = (props) => {

    const [confirmDisabled, setConfirmDisabled] = useState(true)
    useEffect(() => {
        if (props.doctorSelected.id === 0 || props.dateSelected === '' || props.appointmentSelected.timeSlot === 0 || props.reasonForVisit === ''){
            setConfirmDisabled(true)
        } else {
            setConfirmDisabled(false)
        }
    }, [props.doctorSelected, props.dateSelected, props.appointmentSelected, props.reasonForVisit])

    const [isOpen, setIsOpen] = useState(false)
    const showModal = () => {
        setIsOpen(true)
    }
    const hideModal = () => {
        setIsOpen(false)
    }

    const handleSubmit = () => {
        const appointmentData = {
            doctor: props.doctorSelected.id,
            dateString: props.dateSelected.toLocaleDateString(),
            timeSlot: props.appointmentSelected.timeSlot,
            reasonForVisit: props.reasonForVisit
        }
        const url = 'http://localhost:3001/book-appointment'
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(appointmentData)
        }
        fetch(url, requestOptions)
            .then(response => {
                if (response.status === 200){
                    //console.log('success')
                } else {
                    //console.log('error')
                }
            }).catch()
    }

    return (
        <>
            <Button className="mt-2" onClick={showModal} disabled={confirmDisabled}>Confirm Booking</Button>
            <Modal show={isOpen} onHide={hideModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <ModalHeader>
                    <ModalTitle>Appointment with {props.doctorSelected.name}</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    <p>Are you sure you want to book an appointment on {props.dateSelected ? props.dateSelected.toLocaleDateString() : ''} at {props.appointmentSelected.string} with {props.doctorSelected.name}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary" onClick={hideModal}>Cancel</Button>
                    <Button className="btn-success" onClick={handleSubmit}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmAppointmentModal