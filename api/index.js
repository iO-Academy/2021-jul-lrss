const express = require('express')
const mysql = require('promise-mysql')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())

app.post('/patients', function (req, res) {
    const connection = await mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss_2021-10-18'
    })

    const patients = await connection.query('SELECT * FROM `patients`')
    console.log(patients)

})

app.listen(port)