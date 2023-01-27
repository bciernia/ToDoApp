const express = require('express');
const {writeFile, readFile} = require('fs').promises;

const taskRouter = express.Router();

let highestId = 0;

const getParsedTasksFromFile = async () => {
    const tasks = await readFile('task.json', "utf-8");

    return tasks ? JSON.parse(tasks) : [];
}

(async () => {
    const tasks = await getParsedTasksFromFile();

    tasks.length !== 0 ? highestId = tasks[tasks.length - 1].taskId : highestId = 0;
})();

taskRouter

    .get('/all', async (req, res) => {
        const tasks = await readFile('task.json', 'utf-8');

        res.status(200).send(tasks);
    })

    // .get('/task/:taskId', async(req, res) => {
    //     const taskId = req.params.taskId;
    //     const tasks = await getParsedTasksFromFile();
    //
    //     tasks[taskId-1] ? res.send(tasks[taskId-1]) : res.send("There is no task with this ID");
    // })

    .post('/addTask', async (req, res) => {
        const task = req.body
        const tasks = await getParsedTasksFromFile();
        task.taskId = ++highestId;
        tasks.push(task);

        await writeFile('task.json', JSON.stringify(tasks), 'utf-8');

        res.status(201).send(tasks);
    })

    .delete('/:taskId', async(req, res) =>{
        const taskToDelete = Number(req.params.taskId);
        const tasks = await getParsedTasksFromFile();
        const indexOfTaskToDelete = tasks.findIndex(element => element.taskId === taskToDelete);

        tasks.splice(indexOfTaskToDelete, 1);

        await writeFile('task.json', JSON.stringify(tasks), "utf-8");

        res.status(200).send(tasks);
    })

module.exports = {
    taskRouter,
}