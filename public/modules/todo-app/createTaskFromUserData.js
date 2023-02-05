import {createParagraph} from "../core/domManager.js";
import {AlertMessage} from "./alertMessages.js";

const taskForm = document.querySelector(".new-task-from");

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskImportance = taskForm.elements["task-importance"].value;
    const isTaskDeadlineAvailable = taskForm.elements["task-deadline-confirm"].checked;
    const date = new Date(document.querySelector('.new-task-datepicker').value);
    const alertParagraph = taskForm.getElementsByClassName('error-message');

    //ALERT MESSAGES
    const emptyTaskName = createParagraph(AlertMessage.EmptyTaskName, ["error-message"]);
    const wrongDate = createParagraph(AlertMessage.WrongDate, ["error-message"]);
    const emptyDate = createParagraph(AlertMessage.EmptyDate, ["error-message"]);

    const alerts = [];

    Array.from(alertParagraph).forEach(alert => taskForm.removeChild(alert));

    alerts.length = 0;

    if (taskName === "") alerts.push(emptyTaskName);

    if(isTaskDeadlineAvailable && new Date(date).toString() === "Invalid Date") alerts.push(emptyDate);

    if (Date.now() >= date) alerts.push(wrongDate);

    alerts.forEach(alert => taskForm.appendChild(alert));

    if (alerts.length > 0) return null;

    return {
        "taskName": taskName,
        "isTaskDeadlineAvailable": isTaskDeadlineAvailable,
        "taskDeadline": date,
        "taskImportance": taskImportance,
        "currentTaskImportance": taskImportance,
        "isTaskFinished": false,
        "isTaskOverdue": false,
    }
}
