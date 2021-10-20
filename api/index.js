const express = require('express')
const mysql = require('promise-mysql')
const cors = require('cors')
const app = express()
const port = 3001
const session = require('express-session');
const {request} = require("express");
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

app.post('/login', async (req, res) => {

    const isDoctor = req.body.isDoctor
    const emailEntered = req.body.email
    const passwordEntered = req.body.password

    const connection = await mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss_2021-10-18'
    })

    const checkLogin = async (databaseName) => {
        const userData = await connection.query("SELECT `email`, `password` FROM `" + databaseName + "` WHERE `email` = '" + emailEntered + "';")
        if(userData.length !== 0 && userData[0].password === passwordEntered) {
            res.sendStatus(200)
            const sessionID = Math.random()
            console.log("login", sessionID);
            await connection.query("UPDATE `" + databaseName + "` SET `session_id` = '" + sessionID + "' WHERE `email` = '" + emailEntered + "';")
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

app.get('/get-appointments', async (req, res) => {
    const connection = await mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss_2021-10-18'
    })

    // const appointmentData = await connection.query("SELECT `id` FROM `doctors` WHERE `session_id` = '" + req.sessionID + "';")

    //Dummy object
    const appointments = [
    {
        date: "01/11/2021",
        time: 4,
        name: "Bob Bing Along",
        symptoms: "Extra finger growing"

    },
    {
        date: "01/11/2021",
        time: 4,
        name: "The",
        symptoms: "Onion shaped eyes"

    },
    {
        date: "01/12/2021",
        time: 4,
        name: "Bob Bing Along",
        symptoms: "Extra finger growing"
    }
    ]
    res.json(appointments)

})

//Dummy object
app.listen(port)
