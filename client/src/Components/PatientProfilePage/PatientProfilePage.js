import React from "react";
import PatientProfileCard from "../PatientProfileCard/PatientProfileCard";
import LogoutButton from "../LogoutButton/LogoutButton";
import './PatientProfilePage.css'

const PatientProfilePage = () => {
    return (
        <div className={"containerProfilePage"}>
            <PatientProfileCard />
        </div>
    )
}

export default PatientProfilePage