const Task = require('data.task');

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of)

const spy = msg => x => {console.log(msg, x); return x};

module.exports = {eitherToTask, spy}