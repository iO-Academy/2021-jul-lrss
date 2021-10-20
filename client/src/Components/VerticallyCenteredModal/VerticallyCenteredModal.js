import React from "react";
import {Button, Modal} from "react-bootstrap";

const VerticallyCenteredModal = (props) => {
    console.log(props)
    return (
        <Modal onHide={props.onHide} show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Booking Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.dateSelected}</h4>
                <p>You are
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Book Appointment</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VerticallyCenteredModal