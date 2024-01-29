const { createTaskDB, getTasksDB, getTaskByIdDB, updateTaskByIdDB, deleteTaskByIdDB } = require('../repository/task.repository')


async function createTask(tasks) {
    const data = await createTaskDB(tasks)
    if (!data) throw new Error('task is not found');
    return data;
}

async function getTasks() {
    const data = await getTasksDB()
    if (!data) throw new Error('task is not found');
    return data;
}

async function getTaskById(_id) {
    const data = await getTaskByIdDB(_id);
    if (!data) throw new Error('task is not found');
    return data;
}

async function updateTaskById(_id, tasks) {
    const data = await updateTaskByIdDB(_id, tasks);
    if (!data) throw new Error('task is not found');
    return data;
}

async function deleteTaskById(_id) {
    const data = await deleteTaskByIdDB(_id);
    if (!data) throw new Error('task is not found');
    return data;
}

module.exports = { createTask, getTasks, getTaskById, updateTaskById, deleteTaskById};
