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
      const daysInMonth = daysInYear/monthInYear;
      const diff = (new Date() - this.timeCreation) / (1000 * secondInMinute); //minutes

      if (diff < minutesInHour) {
        return diff; //minutes
      }

      if (diff > minutesInHour && diff < minutesInHour * hoursInDay) {
        return diff / minutesInHour; //hours
      }

      if (diff > minutesInHour * hoursInDay && diff < minutesInHour * hoursInDay * daysInMonth) {
        return diff / (minutesInHour * hoursInDay); //days
      }

      if (diff > minutesInHour * hoursInDay * daysInMonth && diff < minutesInHour * hoursInDay * daysInMonth * monthInYear) {
        return diff / (minutesInHour * hoursInDay * daysInMonth); //month
      }

    }
  });
}

var task1 = new Task("Task TaskTask TaskTaskTask");
var task2 = new Task("Task TaskTask TaskTaskTask");
var task3 = new Task("Task TaskTask TaskTaskTask");
var task4 = new Task("Task TaskTask TaskTaskTask");