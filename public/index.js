import {createTaskFromUserData} from "./modules/todo-app/createTaskFromUserData.js";
import {sendTaskToDb} from "/modules/todo-app/sendTask.js";
import {renderTasks, renderTasksByTaskNameFilter, renderTasksByTaskStateFilter} from "./modules/todo-app/getTasks.js";
import {clearAlerts, createAlertMessage} from "./modules/todo-app/alert-messages/alertMessageController.js";
import {AlertMessage} from "./modules/todo-app/alert-messages/alertMessages.js";

const taskForm = document.querySelector(".new-task-from");
const showModal = document.querySelector('#btn-show-modal');
const hideModal = document.querySelector('#btn-hide-modal');
const addTaskModal = document.querySelector('.add-task-modal');
const taskDeadlineCheckbox = document.querySelector("#task-deadline-confirm");
const btnSidebarTransition = document.querySelector(".btn-hide");
const sidebarSection = document.querySelector(".sidebar");
const sidebarFilterButtons = sidebarSection.getElementsByClassName('task-counter');
const filterByNameForm = document.querySelector('.filter-by-name');

renderTasks();

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = createTaskFromUserData();

    if(task === null) return;

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
    const alertParagraph = taskForm.getElementsByClassName('error-message');
    Array.from(alertParagraph).forEach(alert => taskForm.removeChild(alert));
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
        renderTasksByTaskStateFilter(sidebarFilterBtn.classList[2]);
    });
})

filterByNameForm.addEventListener('submit', event => {
    event.preventDefault();
    clearAlerts(filterByNameForm);

    const isRadioButtonIncludesChecked = filterByNameForm.querySelector('.radio-includes-name-filter').checked;
    const filter = document.querySelector('.filter-by-name-input').value;
    if(filter === ""){
        filterByNameForm.appendChild(createAlertMessage(AlertMessage.EmptyTaskNameFilter, ['error-message']));
        renderTasks();
        return;
    }

    renderTasksByTaskNameFilter(isRadioButtonIncludesChecked, filter);
});
