import {showUserTasks} from "./showUserTasks.js";

export const renderTasks = () => {
    fetch('http://localhost:3000/task/all')
        .then(res => res.json())
        .then(data => showUserTasks(data))
}

export const renderTasksByFilter = (filter) => {
    fetch(`http://localhost:3000/task/${filter}`)
        .then(res => res.json())
        .then(data => showUserTasks(data))
        .catch(e => console.log(e));
}