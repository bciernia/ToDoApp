const taskForm = document.querySelector(".new-task-from");

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskImportance = taskForm.elements["task-importance"].value;

    return {
        "taskId": 0,
        "taskName": taskName,
        "taskImportance": taskImportance,
        "isTaskFinished": false,
    }
}

