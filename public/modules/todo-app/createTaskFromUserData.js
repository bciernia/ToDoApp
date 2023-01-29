const taskForm = document.querySelector(".new-task-from");

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskImportance = taskForm.elements["task-importance"].value;
    const taskDeadline = taskForm.elements["task-deadline"].value;

    return {
        "taskId": 0,
        "taskName": taskName,
        "taskDeadline": taskDeadline,
        "taskImportance": taskImportance,
        "isTaskFinished": false,
    }
}

