var Task = (function () {
    var id = 1;
    return function Task(text) {
        this.id = id++;
        this.textTask = text;
        this.dateTask = new Date();
        this.status = "не выполнено";
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

var arr = [];

for(var i = 1; i <= 7; i++)
    arr[i] = new Task("Задача " + i);

function render(arr) {
    var start = document.body.getElementsByClassName('tasks');
    var elem_div;
    var elem_h3;
    var elem_p1;
    var elem_p2;
    var elem_p3;
    var elem_span;
    for(i = 1; i < arr.length; i++) {
        elem_div = document.createElement('div');
        elem_div.className = "task";
        start[0].appendChild(elem_div);

        elem_h3 = document.createElement('h3');
        elem_h3.innerText = arr[i].textTask;
        elem_div.appendChild(elem_h3);

        elem_p1 = document.createElement('p');
        elem_p1.innerText = "id: ";
        elem_div.appendChild(elem_p1);

        elem_span = document.createElement('span');
        elem_span.innerText = arr[i].id;
        elem_p1.appendChild(elem_span);

        elem_p2 = elem_p1.cloneNode(true);
        elem_p2.innerText = "Дата создания: " + arr[i].dateTask.toLocaleString();
        elem_div.appendChild(elem_p2);

        elem_p3 = elem_p1.cloneNode(true);
        elem_div.appendChild(elem_p3);
        elem_p3.innerText = "Статус: ";

        elem_span = document.createElement('span');
        elem_span.innerText = arr[i].status;
        elem_p3.appendChild(elem_span);
        if(arr[i].status == "не выполнено"){
            elem_span.style.color = "red";
        }
        else {
            arr[i].status.style.color = "green";
        }
    }
}

render(arr);

var button = document.getElementsByClassName('button')[0];
var time = -1000;
var change_color = false;
var set_interval_id;

button.addEventListener("click", function (evt) {
            change_color = !change_color;
            if(change_color){
                set_interval_id = setInterval(function () {
                    setTimeout(function () {
                        document.body.style.backgroundColor = "red"
                    }, time += 1000);

                    setTimeout(function () {
                        document.body.style.backgroundColor = "green"
                    }, time += 1000);

                    setTimeout(function () {
                        document.body.style.backgroundColor = "blue"
                    }, time += 1000);

                }, time);
            }
            else {
                location.reload(true);  //гениальный ход
            }
});


