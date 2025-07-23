import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";

export default function completeTask(x) {
    const parent = button.closest('.card');
    const taskId = parent.id;

  allProjects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.id === taskId) {
        task.completed = true;
      }
    });
  });

  allDates.forEach(date => {
    date.tasks.forEach(task => {
      if (task.id === taskId) {
        task.completed = true;
      }
    });
  });

  parent.classList.add('complete'); 
  saveToLocalStorage(allProjects, allDates);
}