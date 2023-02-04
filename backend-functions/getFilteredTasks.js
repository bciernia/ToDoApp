const getFilteredTasks = (tasks, filter) => {
    if(filter === "all-tasks") return tasks;

    return tasks.filter(task => task.taskImportance === filter);
}

module.exports = {
    getFilteredTasks,
}