import {createTaskFromUserData} from "./modules/todo-app/createTaskFromUserData.js";
import {sendTaskToDb} from "/modules/todo-app/sendTask.js";
import {renderTasks} from "./modules/todo-app/getTasks.js";

const taskForm = document.querySelector(".new-task-from");
const showModal = document.querySelector('#btn-show-modal');
const hideModal = document.querySelector('#btn-hide-modal');
const addTaskModal = document.querySelector('.add-task-modal');

renderTasks();

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = createTaskFromUserData();
    sendTaskToDb(task);
    addTaskModal.classList.toggle('add-task-modal-active');
})

showModal.addEventListener('click', () => {
    taskForm.reset();
    addTaskModal.classList.toggle('add-task-modal-active');
})

hideModal.addEventListener('click', () => {
    taskForm.reset();
    addTaskModal.classList.toggle('add-task-modal-active');
})