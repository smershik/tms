(function () {
    var tasks = loadTasks(),
        id = getId(),        
        qs = document.querySelector.bind(document),
        ce = document.createElement.bind(document),
        input = qs('#task-input'),
        taskContainer = qs('.task-list');

    let actions = {
        remove: 'remove',
        check: 'check',
    }

    function createElement(elemName, options, attributes) {
        attributes = attributes || {};
        var elem = ce(elemName);

        Object.assign(elem, options);

        Object.keys(attributes).forEach(function (key) {
            elem.setAttribute(key, attributes[key]);
        });
        return elem;
    }

    function Task(text) {
        var dateCreated = new Date();
        this.checked = false;
        this.text = text || '';
        this.id = id++;

        Object.defineProperty(this, 'dateCreated', {
            enumerable: true,
            get: function () {
                return `${dateCreated.getDate()}/${dateCreated.getMonth()}/${dateCreated.getFullYear()}`;
            }
        })
    }

    function createTask(event) {
        if (event.keyCode === 13) {
            var text = event.target.value;
            if (text) {
                var task = new Task(text);
                tasks.push(task);
                renderTask(task);
                event.target.value = '';
            }
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function getId(){
        return tasks.reduce(function(prev, curr){
            return prev > curr.id ? prev : curr.id;
        }, 0) + 1;
    }

    function removeTask(id) {
        let taskId = parseInt(id, 10);
        tasks = tasks.filter(function (item) {
            return item.id !== taskId;
        });
    }

    function updateTask(id, obj) {
        let taskId = parseInt(id, 10);
        tasks.forEach(function (item) {
            if (item.id === taskId) {
                Object.assign(item, obj);
            }
        });
    }

    function renderTask(task) {
        let taskElem = createElement('DIV',
            { className: task.checked ? 'task checked' : 'task'},
            { 'data-id': task.id },
        );

        [
            createElement('input',
                { type: 'checkbox', className: 'task-checkbox', checked: task.checked },
                { 'data-action': 'check' },
            ),
            createElement('DIV',
                { innerText: task.text, className: 'task-text' },
            ),
            createElement('DIV',
                { innerText: '×', className: 'remove-button' },
                { 'data-action': 'remove' },
            ),
            createElement('DIV',
                { innerText: task.dateCreated, className: 'task-date' },
            ),
        ].forEach(function (item) {
            taskElem.appendChild(item);
        });

        taskContainer.appendChild(taskElem);
    }

    function renderTasks() {
        tasks.forEach(function (task) {
            renderTask(task);
        })
    }

    let handlers = {
        [actions.remove]: function (task) {
            removeTask(task.dataset.id);
            task.remove();
        },
        [actions.check]: function (task) {
            task.classList.toggle('checked');
            updateTask(task.dataset.id, { checked: task.classList.contains('checked') });
        },
    }

    function onClick(event) {
        let task = event.target.closest('[data-id]');
        if (task) {
            handlers[event.target.dataset.action](task);
        }
    }

    input.addEventListener('keypress', createTask);
    taskContainer.addEventListener('click', onClick);
    window.addEventListener('beforeunload', saveTasks);

    renderTasks();
})();

