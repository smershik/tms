var Task = (function () {
    var id = 1;
    return function Task(text) {
        this.id = id++;
        this.textTask = text;
        this.dateTask = new Date();
        this.status = "Не выполнено";
        Object.defineProperty(this, "lifeTime", {
            get: function () {
                var result = new Date().getTime() - this.dateTask.getTime();
                var seconds = Math.floor(result / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                var mounths = Math.floor(days / 30);
                var years = Math.floor(mounths / 12);
                if (years != 0) return "Задача существует " + years + "г. и " + (mounths - years * 12) + "м.";
                if (mounths != 0) return "Задача существует " + mounths + "м. и " + (days - mounths * 30) + "д.";
                if (days != 0) return "Задача существует " + days + "д. и " + (hours - days * 24) + "ч.";
                if (hours != 0) return "Задача существует " + hours + "ч. и " + (minutes - hours * 60) + "м.";
                if (minutes != 0) return "Задача существует " + minutes + "м. и " + (seconds - minutes * 60) + "с.";
                if (seconds != 0) return "Задача существует " + seconds + "c.";
            }
        });
    };
}());

var buttonAdd = document.body.querySelector('.button-add');
buttonAdd.addEventListener('click', addTask);

function addTask() {
    var div = document.body.querySelector('div');
    var obj = new Task(prompt("Введите задачу "));    //ОБЪЕКТ ЗАДАЧИ

    var taskElem = document.createElement('div');   //DIV ДЛЯ ЗАДАЧИ
    taskElem.className = "taskElem"
    div.appendChild(taskElem);

    var h3 = document.createElement('h3');          //ЗАГОЛОВОК ЗАДАЧИ
    h3.innerText = obj.textTask + " (ID: " + obj.id + ")";
    taskElem.appendChild(h3);

    var dateCreate = document.createElement('p');   //Р ДЛЯ ДАТЫ СОЗДАНИЯ
    dateCreate.innerText = "Дата создания: \n";
    taskElem.appendChild(dateCreate);
    var date = document.createElement('span');
    date.innerText = obj.dateTask.toLocaleString();
    dateCreate.appendChild(date);

    var status = document.createElement('span');    //SPAN ДЛЯ СТАТУСА
    status.className = "status-red";
    status.innerText = obj.status;
    taskElem.appendChild(status);

    var divForButtons = document.createElement('div');
    divForButtons.className = "divForButtons"
    taskElem.appendChild(divForButtons);

    var buttonReady = document.createElement('button');
    buttonReady.className = "buttonReady";
    buttonReady.innerText = "Выполнить";
    buttonReady.style.color = "green";
    divForButtons.appendChild(buttonReady);

    var buttonDelete = document.createElement('button');
    buttonDelete.className = "buttonDelete";
    buttonDelete.innerText = "Удалить";
    buttonDelete.style.color = "red";
    divForButtons.appendChild(buttonDelete);

    buttonReady.addEventListener('click', function () {
       status.className = "status-green";
       status.innerText = "Выполнено";
       taskElem.className = "taskElemReady";
    });

    buttonDelete.addEventListener('click', function () {
        taskElem.remove();
    });
};

