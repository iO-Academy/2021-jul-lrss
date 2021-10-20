import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './RegisterPage.css'

const RegisterPage = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [checkedMale, setCheckedMale] = useState(false)
    const [checkedFemale, setCheckedFemale] = useState(false)
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [dobError, setDobError] = useState('')
    const [genderError, setGenderError] = useState('')

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleDobChange = event => {
        setDob(event.target.value)
    }

    const handlePasswordCheckChange = event => {
        setPasswordCheck(event.target.value)
    }

    const handlePhoneNumberChange = event => {
        setPhoneNumber(event.target.value)
    }

    const updateGender = () => {
        if(gender === 'male') {
            setGender('female')
            setCheckedFemale(true);
            setCheckedMale(false)
        } else {
            setGender('male')
            setCheckedFemale(false);
            setCheckedMale(true)
        }
    }

    const validate = (event) => {
        event.preventDefault()
        if (!name) {
            setNameError("Name field is required")
        }
        if (!dob) {
            setDobError("Date of birth is required")
        }
        if (checkedFemale === false && checkedMale === false) {
            setGenderError("Gender is required")
        }
        if (!phoneNumber) {
            setPhoneNumberError("Phone number is required")
        }
        if (password !== passwordCheck) {
            setPasswordError("Passwords don't match")
        }
        if (nameError || genderError || dobError || phoneNumberError || passwordError) {
            return false;
        }
        submit()
    }

    const submit = () => {
            console.log('hoi')
            const url = 'http://localhost:3001/register'
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    gender: gender,
                    dob: dob,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password
                })
            }
            console.log(requestOptions)
            fetch(url, requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        props.history.push('/PatientBookingPage')
                    }
                })
                .catch(error => {
                    console.log('Something went wrong: ', error)
                })
    }

    return (
        <div className="registerContainer">
            <Form onSubmit={validate}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first and last name" onChange={handleNameChange}
                                  value={name}/>
                    <span className="text-danger">{nameError}</span>
                </Form.Group>
                <Form.Group className="mb-3 genderInput" controlId="formBasicGender">
                    <label className="col-sm-4">Gender</label>
                    <label className="col-sm-4 checkbox-inline custom-label">
                        <input id="genMale" type="checkbox" value="male" checked={checkedMale} onChange={updateGender}/>Male
                    </label>
                    <label className="col-sm-4 checkbox-inline">
                        <input id="genFemale" type="checkbox" value="female" checked={checkedFemale}
                               onChange={updateGender}/>Female
                    </label>
                    <span className="text-danger">{genderError}</span>
                </Form.Group>
                <Form.Group controlId="dob">
                    <Form.Label className="custom-label">Select date of birth</Form.Label>
                    <Form.Control type="date" name="dob" selected={dob} value={dob} onChange={handleDobChange}/>
                    <span className="text-danger">{dobError}</span>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="custom-label">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email}/>
                    <span className="text-danger">{emailError}</span>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" onChange={handlePhoneNumberChange}
                                  value={phoneNumber}/>
                    <span className="text-danger">{phoneNumberError}</span>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}
                                  value={password}/>
                    <Form.Label className="custom-label">Please confirm your password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" onChange={handlePasswordCheckChange}
                                  value={passwordCheck}/>
                    <span className="text-danger">{passwordError}</span>
                </Form.Group>
                <Button variant="primary" className="btn btn-primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default RegisterPage