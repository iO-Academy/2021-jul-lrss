import React from "react";
import PatientProfileCard from "../PatientProfileCard/PatientProfileCard";
import LogoutButton from "../LogoutButton/LogoutButton";
import './PatientProfilePage.css'

const PatientProfilePage = () => {
    return (
        <div className={"containerProfilePage"}>
            <PatientProfileCard />
            <LogoutButton />
        </div>
    )
}

export default PatientProfilePage