import {createTaskFromUserData} from "./modules/todo-app/createTaskFromUserData.js";
import {sendTaskToDb} from "/modules/todo-app/sendTask.js";
import {renderTasks, renderTasksByFilter} from "./modules/todo-app/getTasks.js";

const taskForm = document.querySelector(".new-task-from");
const showModal = document.querySelector('#btn-show-modal');
const hideModal = document.querySelector('#btn-hide-modal');
const addTaskModal = document.querySelector('.add-task-modal');
const taskDeadlineCheckbox = document.querySelector("#task-deadline-confirm");
const btnSidebarTransition = document.querySelector(".btn-hide");
const sidebarSection = document.querySelector(".sidebar");
const sidebarFilterButtons = sidebarSection.getElementsByClassName('task-counter');

renderTasks();

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = createTaskFromUserData();

    sendTaskToDb(task);
    addTaskModal.classList.toggle('add-task-modal-active');
})

taskDeadlineCheckbox.addEventListener('change', () => {
    taskDeadlineCheckbox.checked ? taskForm.querySelector('.new-task-datepicker').disabled = false
        : taskForm.querySelector('.new-task-datepicker').disabled = true;
})

showModal.addEventListener('click', () => {
    taskForm.reset();
    taskForm.querySelector('.new-task-datepicker').disabled = true;
    addTaskModal.classList.toggle('add-task-modal-active');
})

hideModal.addEventListener('click', () => {
    taskForm.reset();
    taskForm.querySelector('.new-task-datepicker').disabled = true;
    addTaskModal.classList.toggle('add-task-modal-active');
})

btnSidebarTransition.addEventListener('click', () => {
    sidebarSection.classList.toggle('sidebar-active');
});

Array.from(sidebarFilterButtons).forEach(sidebarFilterBtn => {
    sidebarFilterBtn.addEventListener('click',() => {
        renderTasksByFilter(sidebarFilterBtn.classList[2]);
    });
})

