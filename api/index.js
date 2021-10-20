const express = require('express')
const mysql = require('promise-mysql')
const cors = require('cors')
const session = require('express-session');
const bcrypt = require('bcryptjs')
const app = express()
const port = 3001
const oneDay = 1000 * 60 * 60 * 24;

app.use(cors())
app.use(express.json());
app.set('trust proxy', 1)

app.use(session({
    secret: "hJkrhgODMXjvTpsSNYhjQtBwAB",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.post('/register', async (req, res) => {

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

        await connection.query("INSERT INTO `patients` (`name`, `email`, `mobile`,`hash`, `gender`, `dob`) " +
            "VALUES ('" + userName + "', '" + userEmail + "', '" + userMobile + "', '" + hash + "', '" + userGender + "', '"
            + userDOB + "');")
        res.status(200).send('Registration complete')
    } catch(e) {
        console.log(e)
        res.status(500).send('Registration failed')
    }
})

app.post('/login', async (req, res) => {

    const connection = await mysql.createConnection({
        user: 'root',
        password: 'password',
        database: 'lrss'
    })

    const isDoctor = req.body.isDoctor
    const emailEntered = req.body.email
    const passwordEntered = req.body.password

    const checkLogin = async (tableName) => {
        try {
            const userData = await connection.query("SELECT `email`, `hash` FROM `" + tableName + "` WHERE `email` = '"
                + emailEntered + "';")
            if (userData.length !== 0) {
                const validPass = await bcrypt.compare(passwordEntered, userData[0].hash)
                if (validPass) {
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

app.listen(port)