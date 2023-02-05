import {AlertMessage} from "./alert-messages/alertMessages.js";
import {clearAlerts, createAlertMessage} from "./alert-messages/alertMessageController.js";

const taskForm = document.querySelector(".new-task-from");

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskImportance = taskForm.elements["task-importance"].value;
    const isTaskDeadlineAvailable = taskForm.elements["task-deadline-confirm"].checked;
    const date = new Date(document.querySelector('.new-task-datepicker').value);

    //ALERT MESSAGES
    const emptyTaskName = createAlertMessage(AlertMessage.EmptyTaskName, ["error-message"]);
    const wrongDate = createAlertMessage(AlertMessage.WrongDate, ["error-message"]);
    const emptyDate = createAlertMessage(AlertMessage.EmptyDate, ["error-message"]);

    const alerts = [];
    alerts.length = 0;

    clearAlerts(taskForm);

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
