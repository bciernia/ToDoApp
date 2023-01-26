import {postData} from "../design-system/postData.js";

export const sendTaskToDb = (task) => {
    postData('http://localhost:3000/task/addTask', task);
}