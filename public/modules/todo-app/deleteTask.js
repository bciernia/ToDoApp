import {deleteData} from "../design-system/deleteData.js";
import {showUserTasks} from "./showUserTasks.js";

export const deleteTask = (taskId) => {
    deleteData(`http://localhost:3000/task/${taskId}`, showUserTasks);
}