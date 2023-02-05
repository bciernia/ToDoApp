const lowTasksCounter = document.querySelector('.low-task-counter');
const mediumTasksCounter = document.querySelector('.medium-task-counter');
const highTasksCounter = document.querySelector('.high-task-counter');
const overdueTasksCounter = document.querySelector('.exceeded-task-counter');
const finishedTasksCounter = document.querySelector('.finished-task-counter');
const allTasksCounter = document.querySelector('.all-task-counter');

export const setTasksCounters = (countedTasks) => {
    lowTasksCounter.innerText = countedTasks.Low;
    mediumTasksCounter.innerText = countedTasks.Medium;
    highTasksCounter.innerText = countedTasks.High;
    overdueTasksCounter.innerText = countedTasks.Overdue;
    finishedTasksCounter.innerText = countedTasks.Finished;
    allTasksCounter.innerText = Object.values(countedTasks).reduce((prev, curr) => prev + curr);
}