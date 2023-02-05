import {createListRow, createDiv, createBtnWithImg, createParagraph, createInput} from "../core/domManager.js";
import {deleteTask} from "./deleteTask.js";
import {putTask} from "./putTask.js";

const taskList = document.querySelector('.current-task-list');

const showHeaderText = (arrayLength) => {
    if (arrayLength === 0) {
        document.querySelector('.main-container-info').innerText = "Hooray! You don't have any tasks to do!";
        document.querySelector('.no-tasks-gif').style.display = 'block';
    } else {
        document.querySelector('.main-container-info').innerText = "Your tasks";
        document.querySelector('.no-tasks-gif').style.display = 'none';
    }
}

export const showUserTasks = (tasks) => {
    taskList.innerText = "";

    showHeaderText(tasks.length);

    tasks.sort((taskA, taskB) => (taskA.currentTaskImportance > taskB.currentTaskImportance) ? 1 : -1)
        .forEach(arrayItem => {
            const task = createDiv(["task"]);
            const taskName = createParagraph(arrayItem.taskName, ["task-name-display"]);
            const tasksListRow = createListRow();
            const editTaskNameInput = createInput(arrayItem.taskName);
            const taskDeadlineParagraph =
                createParagraph(`Deadline: ${new Date(arrayItem.taskDeadline).toLocaleDateString()}, ${new Date(arrayItem.taskDeadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`, ["tooltip"]);
            const taskOverdueParagraph = createParagraph(`Overdue task`, ["tooltip"]);

            /*
            * Button methods
            * */
            const editChosenTask = () => {
                editTaskNameInput.value = arrayItem.taskName;
                task.insertBefore(editTaskNameInput, task.firstChild);
                task.removeChild(taskName);
                task.removeChild(btnCheckTask);
                task.removeChild(btnEdit);
                task.appendChild(btnAcceptEditedTask);
                task.appendChild(btnRevertEditedTask);
            }
            const acceptEditedTask = () => {
                arrayItem.taskName = editTaskNameInput.value;

                task.insertBefore(taskName, task.firstChild);
                task.removeChild(editTaskNameInput);
                task.removeChild(btnAcceptEditedTask);
                task.removeChild(btnRevertEditedTask);
                task.appendChild(btnEdit);
                task.appendChild(btnCheckTask);

                arrayItem.taskName === "" ? deleteTask(arrayItem.taskId) : putTask(arrayItem);
            }
            const revertChanges = () => {
                task.insertBefore(taskName, task.firstChild);
                task.removeChild(editTaskNameInput);
                task.removeChild(btnAcceptEditedTask);
                task.removeChild(btnRevertEditedTask);
                task.appendChild(btnEdit);
                task.appendChild(btnCheckTask);
            }
            const activateTask = () => {
                arrayItem.isTaskFinished = false;
                arrayItem.currentTaskImportance = arrayItem.taskImportance;
                putTask(arrayItem);
            }
            const checkTask = () => {
                arrayItem.isTaskFinished = true;
                arrayItem.currentTaskImportance = "4-finished";
                putTask(arrayItem);
            }
            const removeTask = () => {
                deleteTask(arrayItem.taskId);
            }
            const showTaskDeadline = () => {
                taskDeadlineParagraph.classList.toggle("tooltip-shown");
            }
            const showTaskOverdueInfo = () => {
                taskDeadlineParagraph.classList.toggle("tooltip-shown");
            }


            const btnEdit = createBtnWithImg('images/edit.png', ["btn", "btn-edit-task"],
                editChosenTask);
            const btnActivateTask = createBtnWithImg('images/refresh.png', ["btn", "btn-edit-task"],
                activateTask);
            const btnRemove = createBtnWithImg('images/trash.png', ["btn", "btn-remove-task"],
                removeTask);
            const btnCheckTask = createBtnWithImg('images/check.png', ["btn", "btn-remove-task"],
                checkTask);
            const btnAcceptEditedTask = createBtnWithImg('images/check.png', ["btn", "btn-edit-task"],
                acceptEditedTask);
            const btnRevertEditedTask = createBtnWithImg('images/close.png', ["btn", "btn-remove-task"],
                revertChanges)
            const btnTaskOverdue = createBtnWithImg('images/overdue.png', ["btn", "btn-deadline-task"],
                showTaskOverdueInfo);
            const btnDeadLine = createBtnWithImg('images/calendar.png', ["btn", "btn-deadline-task"],
                showTaskDeadline);

            btnDeadLine.appendChild(taskDeadlineParagraph);
            btnTaskOverdue.appendChild(taskOverdueParagraph);

            arrayItem.isTaskFinished ? task.classList.add(`task-importance-background-color-4-finished`)
                : task.classList.add(`task-importance-background-color-${arrayItem.currentTaskImportance}`);

            task.appendChild(taskName);

            if (arrayItem.isTaskDeadlineAvailable) task.appendChild(btnDeadLine);

            if(arrayItem.isTaskOverdue){
                task.removeChild(btnDeadLine);
                task.appendChild(btnTaskOverdue);
            }

            if (arrayItem.isTaskFinished) {
                taskName.classList.add("task-is-finished");
                btnDeadLine.style.display = 'none';
                btnTaskOverdue.style.display = 'none';
                task.appendChild(btnActivateTask);
                task.appendChild(btnRemove);
            } else {
                taskName.classList.remove("task-is-finished");
                btnDeadLine.style.display = 'block';
                btnTaskOverdue.style.display = 'block';
                task.appendChild(btnEdit);
                task.appendChild(btnCheckTask);
            }

            tasksListRow.appendChild(task);
            taskList.appendChild(tasksListRow);
        })
}
