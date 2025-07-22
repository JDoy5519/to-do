import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";

export default function removeParent(x) {
    const thisTask = x.parentElement.parentElement;
    const id = thisTask.id;

    function removeTaskFromCollection(collection, label) {
        for (const project of collection) {
        const index = project.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            project.tasks.splice(index, 1);
            console.log(`Removed task ${id} from ${label}: ${project.title}`);
            return true;
        }
        }
        console.log(`Task with ID ${id} not found in ${label}.`);
        return false;
    }

    thisTask.remove();

    removeTaskFromCollection(allProjects, "allProjects");
    removeTaskFromCollection(allDates, "allDates");

    console.log(allProjects);
    console.log(allDates);
}
