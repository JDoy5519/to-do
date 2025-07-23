import {saveToLocalStorage, loadFromLocalStorage} from "./storage.js";

import Project from "./project.js";
import taskPage from "./task-page.js";
import './styles.css';
import './modal.css';
import Modal from "./modal.js";


//initialise bigger arrays
export let allProjects = [];
export let allDates = [];

//load in any saved data
const loadedData = loadFromLocalStorage();

if (loadedData.projects.length === 0 && loadedData.dates.length === 0) {
  const defaultProject = new Project("Default");
  const today = new Project("Today");
  const thisWeek = new Project("This Week");
  const dashboard = new Project("Dashboard");

  defaultProject.addToLargeArray(allProjects);
  today.addToLargeArray(allDates);
  thisWeek.addToLargeArray(allDates);
  dashboard.addToLargeArray(allDates);

  saveToLocalStorage(allProjects, allDates);
} else {
  allProjects = loadedData.projects;
  allDates = loadedData.dates;
}

//build UI
taskPage();

//Modal load
const confirmModal = new Modal ({
    titleText: 'Create a new task',
    labelText: 'Task title:',
    descriptionText: 'Notes:',
    dueDate: 'When is it due?',
    submit: 'Add task'
});

const taskButton = document.querySelector('#task');

if(taskButton){
  taskButton.addEventListener('click', () => {
    confirmModal.createAndOpen();
});
}