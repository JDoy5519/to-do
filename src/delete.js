import { allProjects } from ".";
import { allDates } from ".";
import { saveToLocalStorage } from "./storage";

export default function removeParent(button) {
    const card = button.closest('.card');
    const taskId = card.id;

    card.remove();

    allProjects.forEach(project => {
        project.tasks = project.tasks.filter(task => task.id !== taskId);
    });

    allDates.forEach(dateProject => {
        dateProject.tasks = dateProject.tasks.filter(task => task.id !== taskId);
    });

    saveToLocalStorage(allProjects, allDates);
}
