import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './LoginPage.css'

const LoginPage = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDoctor, setIsDoctor] =  useState(false)
    const [error, setError] =  useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleDoctorChange = () => {
        setIsDoctor(!isDoctor);
    }

    const goToRegisterPage = () => {
        props.history.push('/register')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const url = 'http://localhost:3001/login'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                isDoctor: isDoctor,
                email: email,
                password: password })
        }
        fetch(url, requestOptions)
            .then(response => {
                if(response.status === 200 && !isDoctor) {
                    setError(false)
                    props.history.push('/appointments')
                } else if (response.status === 200 && isDoctor) {
                    setError(false)
                    props.history.push('/day-planner')
                } else if (response.status === 404) {
                    setError(true)
                }
            })
            .catch(error => {
                console.log('Form submit error', error)
            })
    }

    return (
        <div className="loginContainer">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <label class="form-label">I would like to log in as a:</label>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                            name="isDoctor" id="isDoctor" onChange={handleDoctorChange} value={isDoctor}>
                        <option class="dropdown-item" value="true">doctor</option>
                        <option selected class="dropdown-item" value="false">patient</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                </Form.Group>
                <Form.Group className="mb-3 buttonContainer" controlId="formBasicEmail">
                    <Button variant="primary" className="btn btn-primary" type="submit">Submit</Button>
                    <Button onClick={goToRegisterPage}>Register as a new patient</Button>
                </Form.Group>
                <p className={ !error ? "hidden " : ""}>Sorry, those log in details were incorrect.</p>
            </Form>
        </div>
    )
}

export default LoginPage