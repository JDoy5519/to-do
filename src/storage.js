import Project from "./project";
import Task from "./task";

export function saveToLocalStorage(projects, dates) {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("dates", JSON.stringify(dates));
}

export function loadFromLocalStorage() {
  const rawProjects = localStorage.getItem("projects");
  const rawDates = localStorage.getItem("dates");

  const storedProjects = rawProjects && rawProjects !== 'undefined'
    ? JSON.parse(rawProjects)
    : [];

  const storedDates = rawDates && rawDates !== 'undefined'
    ? JSON.parse(rawDates)
    : [];

  const projects = storedProjects.map(projectObj => {
    const project = new Project(projectObj.title);
    project.tasks = projectObj.tasks.map(taskObj => {
      const task = new Task(
        taskObj.title,
        taskObj.description,
        taskObj.dueDate,
        taskObj.priority,
        taskObj.project
      );
      task.id = taskObj.id;
      task.completed = taskObj.completed || false;
      return task;
    });
    return project;
  });

  const dates = storedDates.map(dateObj => {
    const date = new Project(dateObj.title);
    date.tasks = dateObj.tasks.map(taskObj => {
      const task = new Task(
        taskObj.title,
        taskObj.description,
        taskObj.dueDate,
        taskObj.priority,
        taskObj.project
      );
      task.id = taskObj.id;
      task.completed = taskObj.completed || false;
      return task;
    });
    return date;
  });

  return { projects, dates };
}
