const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/controller/task.controller')


const app = express()

app.use(bodyParser.json())
app.use('/task', route)


app.use((err, req, res, next) => res.send(err.message))

module.exports = app