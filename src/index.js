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

//EXAMPLE TASKS
const doWashing = new Task("Do the washing", "I really need to do the washing today", "01/06/2000", "very important", "Default");
const doCleaning = new Task("Do the cleaning", "I really need to do the washing today", "01/06/2000", "very important", "Default");
const defaultProject = new Project("Default");
const today = new Project("Today");
const thisWeek = new Project ("This Week");
const myScorecard = new Project ("My Scorecard");

//initialise task accordingly
defaultProject.addToLargeArray(allProjects);
today.addToLargeArray(allProjects);
today.addToLargeArray(allDates);
thisWeek.addToLargeArray(allDates);
myScorecard.addToLargeArray(allDates);
doWashing.locateProject();
doCleaning.locateProject();
doWashing.pushToHome();
doCleaning.pushToHome();

//load page
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

taskButton.addEventListener('click', () => {
    confirmModal.createAndOpen();
});

//testing functionality
doWashing.getDate();
doCleaning.getDate();
myScorecard.appendToDom();