const express = require('express');
const { buildResponse } = require('../helper/buildResponse')
const { createTask, getTasks, getTaskById, updateTaskById, deleteTaskById } = require('../service/task.service');
const route = express.Router();

route.post('/', async (req, res) => {
    try {
        const data = await createTask(req.body);
        buildResponse(res, data, 200)
    } catch (err) {
        buildResponse(res, err.message, 404)
    }


})

route.get('/', async (req, res) => {
    try {
        const data = await getTasks(req.body);
        buildResponse(res, data, 200)
    } catch (err) {
        buildResponse(res, err.message, 404)
    }
})

route.get('/:_id', async (req, res) => {
    try {
        const data = await getTaskById(req.params._id)
        buildResponse(res, data, 200)
    } catch (err) {
        buildResponse(res, err.message, 404)
    }
})

route.put('/:_id', async (req, res) => {
    try {
        const data = await updateTaskById(req.params._id, req.body);
        buildResponse(res, data, 200)
    } catch (err) {
        buildResponse(res, err.message, 404)
    }
})

route.delete('/:_id', async (req, res) => {
    try {
        const data = await deleteTaskById(req.params._id)
        buildResponse(res, data, 200)
    } catch (err) {
        buildResponse(res, err.message, 404)
    }
}
)

module.exports = route


