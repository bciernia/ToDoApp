const express = require('express');
const {taskRouter} = require('./routes/task.js')

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use('/task', taskRouter);

app.listen(3000);