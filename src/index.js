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
const doCleaning = new Task("Do the washing", "I really need to do the washing today", "01/06/2000", "very important", "Default");
const defaultProject = new Project("Default");
const coolProject = new Project('Cool');
const wickedProject = new Project('Wicked');

defaultProject.addToLargeArray(allProjects);
coolProject.addToLargeArray(allProjects);
wickedProject.addToLargeArray(allProjects);

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