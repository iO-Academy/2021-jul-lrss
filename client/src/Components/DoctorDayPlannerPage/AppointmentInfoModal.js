import React, {useEffect, useState} from "react";
import {Button, Modal, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

const AppointmentInfoModal = (props) => {
    // const [confirmDisabled, setConfirmDisabled] = useState(true)
    // useEffect(() => {
    //     if (props.doctorSelected.id === 0 || props.dateSelected === '' || props.appointmentSelected.timeSlot === 0 || props.reasonForVisit === ''){
    //         setConfirmDisabled(true)
    //     } else {
    //         setConfirmDisabled(false)
    //     }
    // }, [props.doctorSelected, props.dateSelected, props.appointmentSelected, props.reasonForVisit])
    //
    // const [isOpen, setIsOpen] = useState(false)
    // const showModal = () => {
    //     setIsOpen(true)
    // }
    // const hideModal = () => {
    //     setIsOpen(false)
    // }

    const [isOpen, setIsOpen] = useState(false)

    const showModal = () => {
        setIsOpen(true)
    }
    const hideModal = () => {
        setIsOpen(false)
    }

    // const handleSubmit = () => {
    //     const appointmentData = {
    //         doctor: props.doctorSelected.id,
    //         dateString: props.dateSelected.toLocaleDateString(),
    //         timeSlot: props.appointmentSelected.timeSlot,
    //         reasonForVisit: props.reasonForVisit
    //     }
    //     const url = 'http://localhost:3001/book-appointment'
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(appointmentData)
    //     }
    //     fetch(url, requestOptions)
    //         .then(response => {
    //             if (response.status === 200){
    //                 props.setAppointmentBooked(true)
    //                 props.toggleDisplay()
    //                 hideModal()
    //             } else {
    //                 console.log('error')
    //             }
    //         }).catch()
    // }
    console.log(props.name)
    return (
        <>
            {/*<Modal show={isOpen} onHide={hideModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>*/}
            <Button className={"btn btn-sm"+ (!props.name ? ' d-none' : '')} onClick={showModal}>{props.name}</Button>
            <Modal show={isOpen} onHide={hideModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <ModalHeader>
                    <ModalTitle>Patient name: {props.name}</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    <p>Appointment Time: {props.timeSlot}</p>
                    <p>Patient Date of Birth: {props.dob} </p>
                    <p>Patient Gender: {props.gender} </p>
                    <p>Reason for Visit: {props.reasonForVisit} </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary" onClick={hideModal}>Back</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AppointmentInfoModal