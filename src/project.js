export default class Project {
    constructor(title) {
        this.tasks = [];
        this.title = title;
    }

    addToLargeArray(arr) {
        arr.push(this);
        return arr;
        //here the project array will be project.toDo
    };
}