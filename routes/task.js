const express = require('express');
const {writeFile, appendFile, readFile} = require('fs').promises;

const taskRouter = express.Router();

taskRouter

    .get('/task/all', async (req, res) => {
        const tasks = await readFile('task.json', 'utf8');
        const taskArray = tasks.split("\\");
        taskArray.pop();

        const test = taskArray.map((item) => JSON.parse(item));

        res.send(test);
    })

    .get('/task/:taskId', async(req, res) => {
        const tasks = await readFile('task.json', 'utf8');
        const taskArray = tasks.split("\\");
        const taskId = req.params.taskId;
        taskArray.pop();

        console.log(taskArray[taskId-1]);
    })

    .post('/sendTask', async (req, res) => {
        const task = req.body
        console.log(task);

        await appendFile('task.json', JSON.stringify(task) + "\\", "utf8");
    })

module.exports = {
    taskRouter,
}