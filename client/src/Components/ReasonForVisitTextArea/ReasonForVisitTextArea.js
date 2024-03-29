import React, {useEffect, useState} from "react";
import {FormGroup} from "react-bootstrap";

const ReasonForVisitTextArea = (props) => {
    const [isDisabled, setIsDisabled] = useState(true)
    const handleChange = (evt) => {
        props.setReasonForVisit(evt.target.value)
    }

    useEffect(() => {
        if (props.appointmentSelected.timeSlot === 0){
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [props.appointmentSelected])

    return (
        <FormGroup className="form-floating">
            <textarea
                id="appointmentSelector"
                className="form-control h-auto"
                value={props.reasonForVisit}
                onChange={handleChange}
                rows={3}
                disabled={isDisabled}/>
            <label htmlFor="appointmentSelector">What is the reason for your visit?</label>
        </FormGroup>
    )
}

export default ReasonForVisitTextArea