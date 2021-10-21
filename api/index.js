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

app.use(session({
    secret: "hJkrhgODMXjvTpsSNYhjQtBwAB",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const credValidate = [
    body('email', 'Please enter an e-mail address').isEmail().trim().escape().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Your password must be at least 8 characters')
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

            await connection.query("INSERT INTO `patients` (`name`, `email`, `mobile`,`hash`, `gender`, `dob`) " +
                "VALUES ('" + userName + "', '" + userEmail + "', '" + userMobile + "', '" + hash + "', '" + userGender
                + "', '" + userDOB + "');")
            res.status(200).send('Registration complete')
        } catch(e) {
            console.log(e)
            res.status(500).send('Registration failed')
        }
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
            const userData = await connection.query("SELECT `email`, `hash` FROM `" + tableName + "` WHERE `email`" +
                " = '" + emailEntered + "';")
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