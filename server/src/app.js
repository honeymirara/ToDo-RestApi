const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/controller/task.controller')
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cors = require('cors')


const app = express()

app.use(cors({ origin: 'http://localhost:5173', credential: true }))
app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/task', route)



app.use((err, req, res, next) => res.send(err.message))

module.exports = app