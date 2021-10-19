const express = require('express')
const mysql = require('promise-mysql')
const cors = require('cors')
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.post('/patients', async (req, res) => {

    const userLoginAttempt = req.body.email

    const connection = await mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss_2021-10-18'
    })

    const patientData = await connection.query("SELECT `email`, `password` FROM `patients` WHERE `email` = '" + userLoginAttempt + "';")

    res.json(patientData)
    res.sendStatus(200)
})

app.listen(port)