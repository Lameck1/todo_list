import TaskView from '../views/taskView';
import TaskModel from '../models/taskModel';
import showAlert from '../helpers/showAlert';
import getElement from '../helpers/getElement';
import dragHandler from '../helpers/dragHandler';
import getElementAll from '../helpers/getElementAll';
import refactorIndex from '../helpers/refactorIndex';

export default () => ({

  taskView: new TaskView(),
  newDescription: '',

  handleAddTask() {
    getElement('.task-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const description = getElement('.descInput').value;
      const taskDescriptions = TaskModel.tasks.map((task) => task.description);
      if (!description) {
        showAlert("Task description can't be blank!", 'danger');
      } else if (description === taskDescriptions.find((t) => t === String(description))) {
        showAlert('Duplicate task descriptions not accepted!', 'danger');
      } else {
        const task = new TaskModel(description);
        TaskModel.addTask(task);
        getElement('.descInput').value = '';
        window.location.reload();
      }
    });
  },

  handletoggleTaskStatus() {
    getElementAll('.checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const task = TaskModel.tasks[Number(checkbox.getAttribute('data-id')) - 1];
        TaskModel.toggleTaskStatus(task);
        window.location.reload();
      });
    });
  },

  handleClearCompleted() {
    getElement('.clear-button').addEventListener('click', () => {
      if (TaskModel.tasks.filter((task) => task.complete === true).length > 0) {
        const notComplete = TaskModel.tasks.filter((task) => task.complete === false);
        refactorIndex(notComplete);
        TaskModel.tasks = notComplete;
        TaskModel.refreshStorage();
        window.location.reload();
      } else {
        showAlert('No complete taks at the moment', 'danger');
      }
    });
  },

  handleEditTask() {
    const editables = getElementAll('.editable');
    editables.forEach((editable) => {
      editable.addEventListener('input', (event) => {
        this.newDescription = event.target.textContent;
      });
    });

    editables.forEach((editable) => {
      editable.addEventListener('focusout', (event) => {
        if (this.newDescription) {
          const task = TaskModel.tasks[Number(event.target.getAttribute('data-id')) - 1];
          TaskModel.editTask(task, this.newDescription);
          this.newDescription = '';
          window.location.reload();
        }
      });
    });
  },

  handleDeleteTask() {
    document.querySelectorAll('.delete').forEach((delBtn) => {
      delBtn.addEventListener('click', (event) => {
        const tasks = [...TaskModel.tasks];
        tasks.splice(Number(event.target.getAttribute('data-id')) - 1, 1);
        refactorIndex(tasks);
        TaskModel.tasks = tasks;
        TaskModel.refreshStorage();
        window.location.reload();
      });
    });
  },

  init() {
    if (localStorage.getItem('tasks') === null) {
      TaskModel.refreshStorage();
    }
    this.taskView.showTasks(TaskModel.tasks);
    dragHandler(TaskModel.tasks);
    this.handleAddTask();
    this.handletoggleTaskStatus();
    this.handleClearCompleted();
    this.handleEditTask();
    this.handleDeleteTask();
  },
});