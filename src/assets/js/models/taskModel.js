export default class TaskModel {
  constructor(description) {
    this.index = TaskModel.tasks.length > 0 ? TaskModel.tasks[
      TaskModel.tasks.length - 1].index + 1 : 1;
    this.description = description;
    this.complete = false;
  }

  static toggleTaskStatus(task) {
    task.complete = !task.complete;
    TaskModel.refreshStorage();
  }

  static tasks = JSON.parse(localStorage.getItem('tasks')) || []

  static refreshStorage() {
    localStorage.setItem('tasks', JSON.stringify(TaskModel.tasks));
  }

  static addTask(task) {
    TaskModel.tasks.push(task);
    TaskModel.refreshStorage();
  }

  static editTask(task, newDescription) {
    task.description = newDescription;
    TaskModel.refreshStorage();
  }

  static deleteTask(index) {
    TaskModel.tasks.splice(index, 1);
    TaskModel.refreshStorage();
  }
}
