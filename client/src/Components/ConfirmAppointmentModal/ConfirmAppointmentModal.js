import React, {useEffect, useState} from "react";
import {Button, Modal, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

const ConfirmAppointmentModal = (props) => {

    const [confirmDisabled, setConfirmDisabled] = useState(true)
    useEffect(() => {
        if (props.doctorSelected === '' || props.dateSelected === '' || props.appointmentSelected.timeSlot === 0){
            setConfirmDisabled(true)
        } else {
            setConfirmDisabled(false)
        }
    }, [props.doctorSelected, props.dateSelected, props.appointmentSelected])

    const [isOpen, setIsOpen] = useState(false)
    const showModal = () => {
        setIsOpen(true)
    }
    const hideModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Button className="mt-3" onClick={showModal} disabled={confirmDisabled}>Confirm Booking</Button>
            <Modal show={isOpen} onHide={hideModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <ModalHeader>
                    <ModalTitle>Appointment with {props.doctorSelected ?? 'Any Doctor'}</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    <p>Are you sure you want to book an appointment on {props.dateSelected ? props.dateSelected.toLocaleDateString() : ''} at {props.appointmentSelected.string} with {props.doctorSelected}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary" onClick={hideModal}>Cancel</Button>
                    <Button className="btn-success">Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmAppointmentModal