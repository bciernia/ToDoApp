import {createTaskFromUserData} from "./modules/todo-app/createTaskFromUserData.js";
import {sendTaskToDb} from "/modules/todo-app/sendTask.js";

const taskForm = document.querySelector(".new-task-from");
const btnGetTasks = document.querySelector(".btn-get-tasks");

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task= createTaskFromUserData();

    sendTaskToDb(task);
})

btnGetTasks.addEventListener('click', () => {
    fetch('http://localhost:3000/getTasks')
        .then(res => res.json())
        .then(data => console.log(data));

    console.log("mamy to");
});