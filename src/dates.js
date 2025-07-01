import { differenceInHours, format, isToday, isThisWeek } from "date-fns";

export default function getDate(due) {
    //convert argument to date
    const dueDate = new Date(due);
    console.log(dueDate);

    //logic to decide whether it is today 
    // or this week
    const today = isToday(dueDate);
    const thisWeek = isThisWeek(dueDate);

    //logic for actions based 
    // upon these boolean statements
    if (today === true) {
        console.log("this is today!");
    } else if (thisWeek === true) {
        console.log("this is this week!")
    } else {
        console.log("This is way in the future!")
    }
}