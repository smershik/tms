let container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

let title = document.createElement('h1');
title.innerHTML = 'Add task';
container.appendChild(title);

let textArea = document.createElement('div');
textArea.setAttribute('contenteditable', 'true');
textArea.className = 'text-form';
container.appendChild(textArea);

textArea.addEventListener('focus', function () {
  textArea.style.border = '1px solid #2196F3';
});

textArea.addEventListener('blur', function () {
  textArea.style.border = '1px solid #c3c3c3';
});

let addButton = document.createElement('button');
addButton.innerHTML = '+';
addButton.className = 'add-button';
container.appendChild(addButton);

let taskContainer = document.createElement('div');
taskContainer.className = 'task-container';
container.appendChild(taskContainer);

addButton.addEventListener('click', addTaskToTaskQueue);

textArea.onkeydown = handle;

function handle(key) {

  if (key.keyCode === 13) {

    event.preventDefault();

    addTaskToTaskQueue();
  }

}


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

}

function addTaskToTaskQueue() {

  if (textArea.innerHTML.length == 0) {
    textArea.style.border = '1px solid red';
    return false;
  }

  let tasks = [];
  tasks.push(new Task(textArea.innerHTML));

  for (let i = 0; i < tasks.length; i++) {

    let taskBox = document.createElement('div');
    taskBox.className = 'task-box ordinary';
    taskContainer.insertBefore(taskBox, taskContainer.children[0]);

    let innerTaskBox = document.createElement('div');
    innerTaskBox.innerHTML = '<b>' + tasks[i].id + '</b>' + ' ' + tasks[i].text + '<br>' + '<b>' + tasks[i].timeCreation + '</b>';
    taskBox.appendChild(innerTaskBox);

    let buttonDelete = document.createElement('button');
    buttonDelete.className = 'button btn-delete';
    buttonDelete.innerHTML = 'УДАЛИТЬ';
    taskBox.appendChild(buttonDelete);

    let buttonDo = document.createElement('button');
    buttonDo.className = 'button btn-do';
    buttonDo.innerHTML = 'ВЫПОЛНИТЬ';
    taskBox.appendChild(buttonDo);

    buttonDelete.addEventListener('click', removeTaskBox);
    buttonDo.addEventListener('click', doTask);

    function removeTaskBox() {

      taskBox.remove();

    }

    function doTask() {

      taskBox.classList.add('ready');
      buttonDelete.remove();
      buttonDo.remove();
      tasks[i].ready = true;

    }

  }

  textArea.innerHTML = '';

}




