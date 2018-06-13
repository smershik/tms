let button = document.getElementsByClassName('button');
let body = document.body;

function generateColorHEX() {
    const min = 0;
    const max = 255;
    let r = Math.floor(min + Math.random() * (max + 1 - min));
    let g = Math.floor(min + Math.random() * (max + 1 - min));
    let b = Math.floor(min + Math.random() * (max + 1 - min));
    let colorHEX = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return colorHEX;
}

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", toggleColorChangeInterval);
}
let timer = null;
function toggleColorChangeInterval() {

    if (!timer) {
        timer = setInterval(function () {
            body.style.background = generateColorHEX();
        }, 100);
    }
    else {
        clearInterval(timer);
        timer = null;
        body.style.background = '#000000';
    }
}
