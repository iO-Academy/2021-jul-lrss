const express = require('express')
const mysql = require('promise-mysql')
const cors = require('cors')
const app = express()
const port = 3001
const session = require('express-session');
const router = express.Router();
app.use(cors())
app.use(express.json());
app.set('trust proxy', 1)
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

async function getConnection() {
    return mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss'
    })
}

app.post('/login', async (req, res) => {

    const isDoctor = req.body.isDoctor
    const emailEntered = req.body.email
    const passwordEntered = req.body.password

    const connection = await getConnection()

    const checkLogin = async (databaseName) => {
        const userData = await connection.query("SELECT `email`, `password` FROM `" + databaseName + "` WHERE `email` = '" + emailEntered + "';")
        if(userData.length !== 0 && userData[0].password === passwordEntered) {
            res.sendStatus(200)
            const sessionID = req.sessionID;
            console.log(sessionID)
        } else {
            res.sendStatus(404)
        }
    }

    if(isDoctor) {
        await checkLogin('doctors')
    } else {
        await checkLogin('patients')
    }

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
    const userID = 1; // need to get userID from session variable
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
    const userID = 1; // need to get userID from session variable
    const sqlQuery =
        `SELECT id, name, email, mobile, password, gender, dob
        FROM patients
        WHERE id = ` + userID
    const data = await connection.query(sqlQuery)
    response.json(data)
})

app.get('/get-patient-appointments', async (request, response) => {
    const connection = await getConnection()
    const userID = 1; // need to get userID from session variable
    const sqlQuery =
        `SELECT appointments.id, doctors.name AS doctor, appointments.date, appointments.time_slot
        FROM appointments
        INNER JOIN doctors ON appointments.doctor_id = doctors.id
        WHERE appointments.patient_id = ` + userID
    const data = await connection.query(sqlQuery)
    response.json(data)
})

app.listen(port)
