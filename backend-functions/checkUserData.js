const setDeadlineExceeded = (tasks) => {
    return tasks.map(task => {
        const date = new Date(task.taskDeadline);

        if(Date.now() >= date && task.taskDeadline !== null) {
            task.currentTaskImportance = '0-date-exceeded';
            task.isTaskOverdue = true;
        }

        return task;
    });
}

const setCorrectData = (userDeadline) => {
    const date = new Date(userDeadline);

    if(date >= Date.now()){
        return date;
    }
    return new Date(Date.now());
}

module.exports = {
    setDeadlineExceeded,
    setCorrectData,
}