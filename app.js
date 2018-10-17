require ('dotenv').config();
const express = require('express');
const app = express();
const user = require('./controllers/usercontroller')
const org = require('./controllers/orgcontroller')
const events = require('./controllers/eventcontroller')
const sequelize = require('./db')
sequelize.sync();
// sequelize.sync({force: true})
const bodyParser = require('body-parser')

const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())

app.use(express.static(__dirname + '/public'))
console.log(__dirname)

app.use('/user', user)

app.use('/org', org)

app.use('/events', events)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT} `)) 