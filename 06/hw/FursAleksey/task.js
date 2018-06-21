var localStorageFunctions = {
    'add': function (task) {
        localStorage.setItem(task.id, JSON.stringify(task));
        this.render();
    },

    'getID': function () {
        for(var i = 1; i < 50; i++) {
            if(!localStorage.getItem(i)) return i;
        }
    },

    'render': function () {
        var div = document.getElementById('tasks');
        div.remove();

        div = document.createElement('div');
        div.id = 'tasks';
        document.body.appendChild(div);

        if(localStorage.length > 0)
            for(var i = 1; i < 50; i++) {
                if(localStorage.getItem(i) != undefined) createTask(JSON.parse(localStorage.getItem(i)));
            }
    },

    'ready': function (target) {
        var task = JSON.parse(localStorage.getItem(target.id));
        task.status = 'Выполнено';
        localStorage.setItem(target.id, JSON.stringify(task));
        target.className = 'taskReady';
        this.render();
    },

    'delete': function (target) {
        localStorage.removeItem(target.id);
        this.render();
    }
};
localStorageFunctions.render();

function Task(text) {
        this.id = localStorageFunctions.getID();
        this.textTask = text;
        this.dateTask = new Date().toLocaleString();
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

document.addEventListener('click', function (evt) {
   var target =  evt.target;
   if(target.id == 'buttonReady') {
        while (target.className != 'task' && target.className != 'taskReady')
            target = target.parentElement;
        localStorageFunctions.ready(target);
   }

   if(target.id == 'buttonDelete') {
       while (target.className != 'task' && target.className != 'taskReady')
           target = target.parentElement;
       localStorageFunctions.delete(target);
   }

   if(target.id == 'buttonAdd') {
       var task = new Task(input());
       localStorageFunctions.add(task);
   }
});

function input() {
    return prompt('Введите задачу ');
}

function createTask(task) {
    var placeForAppend = document.createElement('div');
    if(task.status == 'Выполнено') placeForAppend.className = 'taskReady';
    else placeForAppend.className = 'task';
    placeForAppend.id = task.id;
    document.getElementById('tasks').appendChild(placeForAppend);

    var h1 = document.createElement('h1');
    h1.innerText = task.textTask;
    placeForAppend.appendChild(h1);

    var p = document.createElement('p');
    p.innerText = "Дата создания: \n" + task.dateTask;
    placeForAppend.appendChild(p);

    var spanStatus = document.createElement('span');
    spanStatus.innerText = task.status + '\n';
    placeForAppend.appendChild(spanStatus);

    var spanID = document.createElement('span');
    spanID.innerText = 'ID: ' + task.id;
    placeForAppend.appendChild(spanID);

    var divForButtons = document.createElement('div');
    placeForAppend.appendChild(divForButtons);

    var buttonReady = document.createElement('button');
    buttonReady.id = 'buttonReady';
    buttonReady.innerText = 'Выполнить';
    divForButtons.appendChild(buttonReady);

    var buttonDelete = document.createElement('button');
    buttonDelete.id = 'buttonDelete';
    buttonDelete.innerText = 'Удалить';
    divForButtons.appendChild(buttonDelete);
}