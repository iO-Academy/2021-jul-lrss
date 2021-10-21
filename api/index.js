const express = require('express')
const mysql = require('promise-mysql')
const cors = require('cors')
const session = require('express-session');
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')
const app = express()
const port = 3001
const oneDay = 1000 * 60 * 60 * 24;
app.use(cors())
app.use(express.json());
app.set('trust proxy', 1)

let userSession
app.use(session({
    secret: "hJkrhgODMXjvTpsSNYhjQtBwAB",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    isLoggedIn: false,
    userObject: {id: 0, name: ''}
}));

async function getConnection() {
    return mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss'
    })
}

const credValidate = [
    body('email', 'Please enter an e-mail address').isEmail().trim().escape().normalizeEmail(),
    body('password').isLength({min: 8}).withMessage('Your password must be at least 8 characters')
        .matches('[0-9]').withMessage('Your password must contain a number').matches('(?=.*[a-z])(?=.*[A-Z])')
        .withMessage('Your password must contain a lowercase and an uppercase letter').trim().escape(),
    body('dob', 'Please enter a valid date format').isDate().escape().trim(),
    body('gender', 'Please choose either male or female').matches('(fe)?male').escape().trim(),
    body('phoneNumber', 'Please enter a valid UK phone number')
        .matches('(((\\+44)? ?(\\(0\\))? ?)|(0))( ?[0-9]{3,4}){3}').trim().escape(),
    body('name', 'Please provide a valid name')
        .matches('^(([A-Za-z]+[,.]?[ ]?|[a-z]+[\'-]?)+)$').trim().escape()]

app.post('/register', ...credValidate, async (req,
                                              res) => {
    userSession = req.session
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    else {
        const connection = await mysql.createConnection({
            user: 'root',
            password: 'password',
            database: 'lrss'
        })

        try {
            const userName = req.body.name
            const userEmail = req.body.email
            const userMobile = req.body.phoneNumber
            const userPassword = req.body.password
            const userGender = req.body.gender
            const userDOB = req.body.dob
            const hash = await bcrypt.hash(userPassword, 12)

            const success = await connection.query("INSERT INTO `patients` (`name`, `email`, `mobile`,`hash`, `gender`, `dob`) " +
                "VALUES ('" + userName + "', '" + userEmail + "', '" + userMobile + "', '" + hash + "', '" + userGender
                + "', '" + userDOB + "');")
            if (success){
                const userID = await connection.query(`SELECT id FROM patients WHERE email = '` + userEmail + `';`)
                console.log("USER ID TEST: " + userID.id + "\n\n\n\n")
                userSession.isLoggedIn = true
                userSession.userObject = {id: userID.id, name: userName}
                res.status(200).send('Registration complete')
            }
        } catch(e) {
            console.log(e)
            res.status(500).send('Registration failed')
        }
    }
})

app.post('/login', async (req, res) => {
    userSession = req.session
    const connection = await getConnection()
    const isDoctor = req.body.isDoctor
    const emailEntered = req.body.email
    const passwordEntered = req.body.password

    const checkLogin = async (tableName) => {
        try {
            const userData = await connection.query("SELECT `id`, `email`, `hash` FROM `" + tableName + "` WHERE `email`" +
                " = '" + emailEntered + "';")
            if (userData.length !== 0) {
                const validPass = await bcrypt.compare(passwordEntered, userData[0].hash)
                if (validPass) {
                    userSession.isLoggedIn = true
                    userSession.userObject = {id: userData[0].id}
                    res.status(200).json('Valid login credentials entered.')
                } else {
                    res.status(401).json('Incorrect password.')
                }
            } else {
                res.status(404).json('User not found.')
            }
        } catch(e) {
            console.log(e)
            res.status(500).send('The site isn\'t working correctly')
        }
    }

    if(isDoctor) {
        await checkLogin('doctors')
    } else {
        await checkLogin('patients')
    }
})

app.get('/logout', async (request, response) => {
    request.session.destroy()
    userSession.isLoggedIn = false
    response.status(401).send('You are not logged in.')
})

app.get('/get-doctors', async (request, response) => {
    const connection = await getConnection()
    response.json(await connection.query("SELECT `id`, `name` FROM doctors;"))
})

app.post('/get-doctor-appointments-for-day', async (request, response) => {
    const connection = await getConnection()
    const sqlQuery =
        `SELECT appointments.id, appointments.time_slot, doctors.name AS doctor, patients.name AS patient, 
            patients.dob AS patient_dob, patients.gender AS patient_gender, appointments.reason_for_visit
        FROM appointments
        INNER JOIN doctors ON appointments.doctor_id = doctors.id
        INNER JOIN patients ON appointments.patient_id = patients.id
        WHERE doctor_id = ` + request.body.doctorID + ` AND date = '` + request.body.date + `';`
    const data = await connection.query(sqlQuery)
    response.json(data)
})

app.post('/book-appointment', async (request, response) => {
    const connection = await getConnection()
    const userID = userSession.userObject.id
    const sqlQuery =
        `INSERT INTO appointments (patient_id, doctor_id, date, time_slot, reason_for_visit)
        VALUES (` + userID + `, ` + request.body.doctor + `, '` + request.body.dateString + `', ` + request.body.timeSlot + `, '` + request.body.reasonForVisit + `');`
    const success = await connection.query(sqlQuery)
    if (success){
        response.sendStatus(200)
    } else {
        response.sendStatus(500)
    }
})

app.get('/get-patient', async (request, response) => {
    const connection = await getConnection()
    const userID = userSession.userObject.id
    const sqlQuery =
        `SELECT id, name, email, mobile, hash, gender, dob
        FROM patients
        WHERE id = ` + userID
    const data = await connection.query(sqlQuery)
    response.json(data)
})

app.get('/get-patient-appointments', async (request, response) => {
    const connection = await getConnection()
    const userID = userSession.userObject.id
    const sqlQuery =
        `SELECT appointments.id, doctors.name AS doctor, appointments.date, appointments.time_slot
        FROM appointments
        INNER JOIN doctors ON appointments.doctor_id = doctors.id
        WHERE appointments.patient_id = ` + userID
    const data = await connection.query(sqlQuery)
    response.json(data)
})

app.post('/cancel-appointment', async (request, response) => {
    const connection = await getConnection()
    const userID = userSession.userObject.id
    const sqlQuery =
        `DELETE FROM appointments WHERE patient_id = ` + userID + ` AND date = '` + request.body.date + `';`
    const success = await connection.query(sqlQuery)
    if (success){
        response.sendStatus(200)
    } else {
        response.sendStatus(500)
    }
})

app.listen(port)
