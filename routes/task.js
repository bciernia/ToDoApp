const express = require('express');
const {writeFile, readFile} = require('fs').promises;

const taskRouter = express.Router();

const getParsedTasksFromFile = async () => {
    const tasks = await readFile('task.json', "utf8");

    return tasks ? JSON.parse(tasks) : [];
}

taskRouter

    .get('/task/all', async (req, res) => {
        const tasks = await readFile('task.json', 'utf8');

        res.send(tasks);
    })

    .get('/task/:taskId', async(req, res) => {
        const taskId = req.params.taskId;
        const tasks = await getParsedTasksFromFile();

        tasks[taskId-1] ? res.send(tasks[taskId-1]) : res.send("There is no task with this ID");
    })

    .post('/sendTask', async (req, res) => {
        const task = req.body
        const tasks = await getParsedTasksFromFile();
        tasks.push(task);

        await writeFile('task.json', JSON.stringify(tasks), 'utf8');
    })

module.exports = {
    taskRouter,
}