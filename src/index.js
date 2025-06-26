import storageAvailable from "./storage.js";
import Task from "./task.js";
import Project from "./project.js";
import taskPage from "./task-page.js";
import './styles.css'

taskPage();

const doWashing = new Task("Do the washing", "I really need to do the washing today", "01/06/2000", "very important", "Daily Tasks");
const defaultProject = new Project("Default");

console.log(defaultProject);

doWashing.addToProject(defaultProject.toDo);
console.log(defaultProject);
console.log(doWashing);