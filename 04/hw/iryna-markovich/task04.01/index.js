function getCounter(start) {
  let counter = start;
  return function () {
    return counter++;
  }
}

const generatorId = getCounter(1);

function Task(taskText) {
  this.id = generatorId();
  this.text = taskText;
  this.timeCreation = new Date();
  this.ready = false;

  Object.defineProperty(this, "dateFormatCreate", {
    get: function () {
      const secondInMinute = 60;
      const minutesInHour = 60;
      const hoursInDay = 24;
      const daysInYear = 365;
      const monthInYear = 12;
      const daysInMonth = daysInYear / monthInYear;
      let beginingOfSentence = "Task was created ";
      let endOfSentence = " ago";
      const diff = (new Date() - this.timeCreation) / (1000 * secondInMinute); //minutes

      if (diff < minutesInHour) {
        return beginingOfSentence + Math.round(diff) + " minutes" + endOfSentence; //minutes
      }

      if (diff > minutesInHour && diff < minutesInHour * hoursInDay) {
        return beginingOfSentence + Math.round(diff / minutesInHour) + " hours" + endOfSentence; //hours
      }

      if (diff > minutesInHour * hoursInDay && diff < minutesInHour * hoursInDay * daysInMonth) {
        return beginingOfSentence + Math.round(diff / (minutesInHour * hoursInDay)) + " days" + endOfSentence; //days
      }

      if (diff > minutesInHour * hoursInDay * daysInMonth && diff < minutesInHour * hoursInDay * daysInMonth * monthInYear) {
        return beginingOfSentence + Math.round(diff / (minutesInHour * hoursInDay * daysInMonth)) + " months" + endOfSentence; //months
      }

    }
  });
}


let task1 = new Task("Task Task Task Task Task");
let task2 = new Task("Task");
let task3 = new Task("Task Task Task");
let task4 = new Task("Task Task Task Task");

let tasks = [];
tasks.push(task1, task2, task3, task4);

let container = document.createElement('div');
container.className = "container";
document.body.appendChild(container);


for (let i = 0; i < tasks.length; i++) {
  let taskBox = document.createElement('div');
  taskBox.className = "task-box";
  taskBox.innerHTML = tasks[i].id + ' ' + tasks[i].text + "<br>" + "<b>" + tasks[i].dateFormatCreate + "</b>";
  container.appendChild(taskBox);
}

