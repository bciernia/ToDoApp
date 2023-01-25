import {createTaskFromUserData} from "./modules/todo-app/createTaskFromUserData.js";
import {sendTaskToDb} from "/modules/todo-app/sendTask.js";
import {renderTasks} from "./modules/todo-app/getTasks.js";

const taskForm = document.querySelector(".new-task-from");
const btnGetTasks = document.querySelector(".btn-get-tasks");

renderTasks();

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = createTaskFromUserData();

    sendTaskToDb(task);

    taskForm.reset();
})

btnGetTasks.addEventListener('click', () => {
    renderTasks();
});

