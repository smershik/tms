var button = document.getElementsByClassName('button');
var body = document.body;
var colors = ['#000000', 'blue', '#ffeb3b', '#3f51b5'];

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", changeColor);
}
let timer = null;
function changeColor() {

    if (!timer) {
        timer = setInterval(function () {
            body.style.background = colors[Math.floor(Math.random() * 3)];
        }, 100);
    }
    else {
        clearInterval(timer);
        timer = null;
        body.style.background = colors[0];
    }
}
