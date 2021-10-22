import React from "react";
import PatientProfileCard from "../PatientProfileCard/PatientProfileCard";
import LogoutButton from "../LogoutButton/LogoutButton";

const PatientProfilePage = () => {
    return (
        <div>
            <PatientProfileCard />
            <LogoutButton />
        </div>
    )
}

export default PatientProfilePage