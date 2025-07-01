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

//load page
taskPage();

//EXAMPLE TASKS
const doWashing = new Task("Do the washing", "I really need to do the washing today", "01/06/2000", "very important", "Default");
const doCleaning = new Task("Do the cleaning", "I really need to do the washing today", "01/06/2000", "very important", "Default");
const defaultProject = new Project("Default");
const today = new Project("Today");
const thisWeek = new Project ("This Week");
const otherDate = new Project ("Other Date");

defaultProject.addToLargeArray(allProjects);
today.addToLargeArray(allDates);
thisWeek.addToLargeArray(allDates);
otherDate.addToLargeArray(allDates);

console.log(allProjects);
console.log(allDates);
doWashing.locateProject();
doCleaning.locateProject();
console.log(allProjects);


//Modal load
const confirmModal = new Modal ({
    titleText: 'What is your next shot?',
    labelText: 'Shot name:',
    descriptionText: 'Describe your shot:',
    dueDate: 'Tee time:',
    submit: 'Take a swing!'
})

const taskButton = document.querySelector('#task');

taskButton.addEventListener('click', () => {
    confirmModal.createAndOpen();
});

//testing functionality
defaultProject.appendToDom();
doWashing.getDate();
doCleaning.getDate();