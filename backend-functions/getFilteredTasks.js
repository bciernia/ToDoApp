const getFilteredTasksByState = (tasks, filter) => {

    switch (filter){
        case "all-tasks":
            return tasks;

        case "4-finished":
            return tasks.filter(task => task.isTaskFinished === true);

        default:
            return tasks.filter(task => task.currentTaskImportance === filter && task.isTaskFinished === false);
    }
}

const getTasksIncludesFilter = (tasks, filter) => {
    return tasks.filter(task => task.taskName.includes(filter));
}

const getTasksStartedWithFilter = (tasks, filter) => {
    return tasks.filter(task => task.startsWith(filter));
}

module.exports = {
    getFilteredTasksByState,
    getTasksIncludesFilter,
    getTasksStartedWithFilter,
}