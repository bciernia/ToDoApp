import {showUserTasks} from "./showUserTasks.js";

export const renderTasks = () => {
    fetch('http://localhost:3000/task/all')
        .then(res => res.json())
        .then(data => showUserTasks(data[0], data[1]))
}

export const renderTasksByFilter = (filter) => {
    fetch(`http://localhost:3000/task/${filter}`)
        .then(res => res.json())
        .then(data => showUserTasks(data[0], data[1]))
        .catch(e => console.log(e));
}