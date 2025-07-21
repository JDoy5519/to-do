import storageAvailable from "./storage.js";
import Task from "./task.js";
import Project from "./project.js";
import taskPage from "./task-page.js";
import './styles.css';
import './modal.css';
import Modal from "./modal.js";
import userInput from "./user-input.js";

//initialise bigger arrays
export const allProjects = [];
export const allDates = [];

//Initialise default arrays
const defaultProject = new Project("Default");
const today = new Project("Today");
const thisWeek = new Project ("This Week");
const dashboard = new Project ("Dashboard");

//add projects to arrays for storage
defaultProject.addToLargeArray(allProjects);
today.addToLargeArray(allDates);
thisWeek.addToLargeArray(allDates);
dashboard.addToLargeArray(allDates);


//load page
taskPage();

console.log(allDates);

//Modal load
const confirmModal = new Modal ({
    titleText: 'Create a new task',
    labelText: 'Task title:',
    descriptionText: 'Notes:',
    dueDate: 'When is it due?',
    submit: 'Add task'
});

const taskButton = document.querySelector('#task');

taskButton.addEventListener('click', () => {
    confirmModal.createAndOpen();
});


dashboard.appendToDom();