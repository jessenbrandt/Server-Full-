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

app.use(bodyParser.json())

app.use(require('./middleware/headers'))

app.use(express.static(__dirname + '/public'))
console.log(__dirname)

app.get('/', (req, res) => res.render('app'))

app.use('/user', user)

app.use('/org', org)

app.use('/events', events)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT} `)) 