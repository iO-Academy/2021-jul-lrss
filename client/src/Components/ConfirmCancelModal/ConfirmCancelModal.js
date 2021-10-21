import React, {useEffect, useState} from "react";
import {Button, Modal, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

const ConfirmCancelModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const showModal = () => {
        setIsOpen(true)
    }
    const hideModal = () => {
        setIsOpen(false)
    }

    const cancelAppointment = evt => {
        evt.preventDefault()
        const url = 'http://localhost:3001/cancel-appointment'
        const cancelOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date: props.appointmentData.date ?? ''
            })
        }
        // console.log(cancelOptions)
        fetch(url, cancelOptions)
            .then(response => {
                if (response.status === 200){
                    props.setAppointmentData({
                        id: 0,
                        doctor: '',
                        date: '',
                        time_slot: 0
                    })
                    hideModal()
                }
            }).catch(error => {
                console.log('Something went wrong: ', error)
        })
    }

    return (
        <>
            <Button className="mt-2 btn-danger" onClick={showModal}>Cancel Booking</Button>
            <Modal show={isOpen} onHide={hideModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <ModalHeader>
                    <ModalTitle>Cancel Appointment</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    <p>Are you sure you want to cancel your appointment?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary" onClick={hideModal}>Cancel</Button>
                    <Button className="btn-danger" onClick={cancelAppointment}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmCancelModal