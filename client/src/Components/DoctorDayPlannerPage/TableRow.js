import React, {useEffect, useState} from "react";
import DoctorDayPlannerPage from "./DoctorDayPlannerPage";
import AppointmentInfoModal from "./AppointmentInfoModal";

const TableRow = ( {appointment}, {displayTimeSlot}, {moduleDisplay} ) => {
    return (
        <tr>
            <td>{displayTimeSlot(appointment.time_slot)}</td>
            <td>{appointment.patient ? appointment.patient : ''}</td>
            <AppointmentInfoModal className={!moduleDisplay ? 'd-none' : ''}
                timeSlot={displayTimeSlot(appointment.time_slot)}
                name={appointment.patient ? appointment.patient : ''}
                reasonForVisit={appointment.reason_for_visit ? appointment.reason_for_visit : ''}
                dob={appointment.patient_dob ? appointment.patient_dob : ''}
                gender={appointment.patient_gender ? appointment.patient_gender : ''}
            />
        </tr>
    )
}

export default TableRow
