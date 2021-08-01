class Scheduler {
  constructor(interval = 60000, delay = 0) {
    this.startTimeStamp = Date.now();
    this.tasks = {};
    this.interval = interval;
    this.delay = delay;
  }

  addTask(taskName, task) {
    if (typeof task === 'function' && !this.tasks[taskName]) {
      this.tasks[taskName] = task;
    }
  }

  removeTask(taskName) {
    delete this.tasks[taskName];
  }

  removeAllTasks() {
    Object.keys(this.tasks).forEach((task) => {
      this.removeTask(task);
    });
  }

  runTaskByName(taskName) {
    if (typeof this.tasks[taskName] === 'function') {
      this.tasks[taskName]();
    }
  }

  runAllTasks() {
    Object.keys(this.tasks).forEach((task) => {
      this.runTaskByName(task);
    });
  }

  startTasks() {
    setTimeout(() => {
      this.runAllTasks();
      setInterval(() => {
        this.runAllTasks();
      }, this.interval);
    }, this.delay);
  }
}

module.exports = Scheduler;
