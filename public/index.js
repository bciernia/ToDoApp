import {createTaskFromUserData} from "./modules/todo-app/createTaskFromUserData.js";
import {sendTaskToDb} from "/modules/todo-app/sendTask.js";
import {showUserTasks} from "./modules/todo-app/showUserTasks.js";

const taskForm = document.querySelector(".new-task-from");
const btnGetTasks = document.querySelector(".btn-get-tasks");

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = createTaskFromUserData();

    sendTaskToDb(task);

    taskForm.reset();
})

btnGetTasks.addEventListener('click', () => {
    fetch('http://localhost:3000/task/all')
        .then(res => res.json())
        .then(data => showUserTasks(data));
});

