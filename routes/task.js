const express = require('express');
const {writeFile, readFile} = require('fs').promises;
const {setCorrectData, setDeadlineExceeded} = require('../backend-functions/checkUserData');
const {getFilteredTasksByState, getFilteredTasksByName} = require("../backend-functions/getFilteredTasks");
const {countAllTasks} = require("../backend-functions/countAllTasks");

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
        const tasks = await getParsedTasksFromFile();
        const countedTasks = countAllTasks(tasks);

        await writeFile('task.json', JSON.stringify(setDeadlineExceeded(tasks)), "utf-8");

        res.status(200).send([tasks, countedTasks]);
    })

    .get('/:tasksFilter', async (req, res) => {
        const {tasksFilter} = req.params;
        const tasks = await getParsedTasksFromFile();
        const countedTasks = countAllTasks(tasks);
        const filteredTasks = getFilteredTasksByState(tasks, tasksFilter);

        res.status(201).send([filteredTasks, countedTasks]);
    })

    .get('/:filterType/:tasksFilter', async (req, res) => {
        const {filterType, tasksFilter} = req.params;
        const tasks = await getParsedTasksFromFile();
        const countedTasks = countAllTasks(tasks);
        const filteredTasks = getFilteredTasksByName(tasks, tasksFilter, filterType);

        res.status(201).send([filteredTasks, countedTasks]);
    })

    .put('/:taskId', async (req, res) => {
        const tasks = await getParsedTasksFromFile();
        const newTask = req.body;
        const taskId = Number(req.params.taskId);
        const taskIndexToChange = tasks.findIndex(element => element.taskId === taskId);

        tasks[taskIndexToChange] = newTask;

        const countedTasks = countAllTasks(tasks);

        await writeFile('task.json', JSON.stringify(tasks), 'utf-8');

        res.status(201).send([tasks, countedTasks]);
    })

    .post('/addTask', async (req, res) => {
        const task = req.body
        const tasks = await getParsedTasksFromFile();

        task.taskId = ++highestId;
        if(task.taskDeadline && !task.isTaskOverdue) task.taskDeadline = setCorrectData(task.taskDeadline);
        tasks.push(task);

        const countedTasks = countAllTasks(tasks);

        await writeFile('task.json', JSON.stringify(tasks), 'utf-8');

        res.status(201).send([tasks, countedTasks]);
    })

    .delete('/:taskId', async(req, res) =>{
        const taskToDelete = Number(req.params.taskId);
        const tasks = await getParsedTasksFromFile();
        const indexOfTaskToDelete = tasks.findIndex(element => element.taskId === taskToDelete);

        tasks.splice(indexOfTaskToDelete, 1);

        const countedTasks = countAllTasks(tasks);

        await writeFile('task.json', JSON.stringify(tasks), "utf-8");

        res.status(200).send([tasks, countedTasks]);
    })

module.exports = {
    taskRouter,
}