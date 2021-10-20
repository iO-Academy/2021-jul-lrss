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

app.get('/all-doctors', async (request, response) => {
    const connection = await getConnection()
    response.json(await connection.query("SELECT `id`, `name` FROM doctors;"))
})

app.post('/appointments', async (request, response) => {
    const connection = await getConnection()
    const sqlQuery =
        `SELECT appointments.id, appointments.time_slot, doctors.name AS doctor
        FROM appointments
        INNER JOIN doctors ON appointments.doctor_id = doctors.id
        WHERE doctor_id = ` + request.body.doctor + ` AND date = '` + request.body.date + `';`
    const data = await connection.query(sqlQuery)
    response.json(data)
})

app.listen(port)
