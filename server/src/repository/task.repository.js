const { Table, ObjectId } = require('../db');

async function createTaskDB(tasks) {
    await Table.create(tasks)
    const data = await Table.find()
    return data
}

async function getTasksDB() {
    const data = await Table.find();
    return data;
}

async function getTaskByIdDB(_id) {
    const data = await Table.findOne({ _id: new ObjectId(_id) })
    return data;
}

async function updateTaskByIdDB(_id, tasks) {
    const data = await Table.findByIdAndUpdate({ _id: new ObjectId(_id) }, { $set: tasks }, { new: true })
    return data;
}

async function deleteTaskByIdDB(_id) {
    const data = await Table.findByIdAndDelete({ _id: new ObjectId(_id) })
    return data;
}

module.exports = { createTaskDB, getTasksDB, getTaskByIdDB, updateTaskByIdDB, deleteTaskByIdDB }