import {deleteData} from "../design-system/deleteData.js";

export const deleteTask = (taskId) => {
    deleteData(`http://localhost:3000/task/${taskId}`);
}