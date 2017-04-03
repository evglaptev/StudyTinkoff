"use strict";

var listElement = document.querySelector('.list');
var itemElementList = listElement.children;


var templateElement = document.getElementById('todoTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

// сформируем задачки
var todoList = [
{
    name: 'Позвонить в сервис',
    status: 'todo',
    dateTime: new Date(Date.now())
},
{
    name: 'Купить хлеб',
    status: 'done',
    dateTime: new Date(Date.now())
},
{
    name: 'Захватить мир',
    status: 'todo',
    dateTime: new Date(Date.now())
},
{
    name: 'Добавить тудушку в список',
    status: 'todo',
    dateTime: new Date(Date.now())
}
]

var filter={
    TODO:'todo',
    DONE:'done',
    ALL:'all'
}


function Statistic() {

}
Statistic.prototype.getFunc = function (status) {

    if (status === filter.ALL) return this.getAllTasks;
    if (status === filter.DONE) return this.getDoneTasks;
    return this.getTodoTasks;
}
Statistic.prototype.getAllTasks = function () {
    return this.todoList;
}
Statistic.prototype.getTodoTasks = function () {
    return Array.prototype.filter.call(this.todoList, function (item) {
        return item.status === 'todo'
    })
}
Statistic.prototype.getDoneTasks = function () {
    return Array.prototype.filter.call(this.todoList, function (item) {
        return item.status === 'done'
    })
}
Statistic.prototype.getCountTotal = function () {
    return this.getAllTasks().length
}
Statistic.prototype.getCountTodo = function () {
    return this.getTodoTasks().length;
}
Statistic.prototype.getCountDone = function () {
    return this.getDoneTasks().length;
}

function Model(tdList, stats) {
    this.stats = stats;
    this.status = filter.ALL,
     this.todoList = tdList;
    var listElement = document.querySelector('.list');
    this.countTotal = document.querySelector(".statistic__total").textContent
    this.countDone = document.querySelector(".statistic__done").textContent
    this.countLeft = document.querySelector(".statistic__left").textContent
    this.refresh();
}


Model.prototype.createTask = function (todo) {
         this.todoList.unshift(createNewTodo(todo));
};
Model.prototype.changeTodoStatus = function (todoContent) {
        var index = this.getIndex(todoContent);
        todoList[index].status = todoList[index].status === 'todo' ? 'done' : 'todo';
        todoList[index].dateTime = new Date(Date.now());

};
Model.prototype.deleteTask = function (todoContent) {
        var index = this.getIndex(todoContent);

        console.dir(index);
        todoList.splice(index, 1);
};
Model.prototype.getIndex = function (todoContent) {
        return this.todoList
        .map(function (item) {
            return item.name
        })
        .indexOf(todoContent);
};
Model.prototype.refresh = function () {
        var newElement = templateContainer.querySelector('.task').cloneNode(true);

        listElement.textContent = "";

        var selectedFilter = document.querySelector(".filters__item_selected");
        selectedFilter.classList.remove("filters__item_selected");

        Array.prototype.find.call(document.querySelectorAll(".filters__item"), function (item) {
            return item.getAttribute("data-filter") === this.status;
        }, this).classList.add("filters__item_selected");

        var newList = this.stats.getFunc(this.status).call(this).map(addTodoFromTemplate);
        newList.forEach(function (element) {
            listElement.appendChild(element);

        })

        countTotal = this.stats.getCountTotal();
        countDone = this.stats.getCountDone();
        countLeft = this.stats.getCountTodo();
};
Model.prototype.setStatus = function (status) {
        this.status = status;
    }

var stats = new Statistic();
var model = new Model(todoList,stats);



function addTodoFromTemplate(todo) {
    var formatterTime = new Intl.DateTimeFormat("ru", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
    var formatterDate = new Intl.DateTimeFormat("en-US");
    var newElement = templateContainer.querySelector('.task').cloneNode(true);
    newElement.querySelector('.task__name').textContent = todo.name;
    var date = newElement.querySelector('.datetime__item');
    date.querySelector('.task__time').textContent =  formatterTime.format(todo.dateTime);
    date.querySelector('.task__date').textContent = formatterDate.format(date.dateTime);
    setTodoStatusClassName(newElement, todo.status === 'todo');

    return newElement;
}

function setTodoStatusClassName(todo, flag) {
    todo.classList.toggle('task_todo', flag);
    todo.classList.toggle('task_done', !flag);
}

function onListClick(event) {
    var target = event.target;
    var todoText;

    todoText = target.parentNode.querySelector('.task__name').textContent;
    if (isStatusBtn(target)) {
        model.changeTodoStatus(todoText);
    }

    if (isDeleteBtn(target)) {
        model.deleteTask(todoText);
    }
    model.refresh();
}
function onFilterClick(event) {

    var target = event.target;
    if (target.classList.contains("filters__item")) {
        model.setStatus(target.getAttribute("data-filter"));
        model.refresh();
    }
}

function isStatusBtn(target) {
    return target.classList.contains('task__status');
}

function isDeleteBtn(target) {
    return target.classList.contains('task__delete-button');
}


function deleteTodo(element) {
    listElement.removeChild(element);
}

function onInputKeydown(event) {
    if (event.keyCode !== 13) {
        return;
    }

    var ENTER_KEYCODE = 13;
    if (event.keyCode !== ENTER_KEYCODE) {
        return;
    }

    var todoName = inputElement.value.trim();

    if (todoName.length === 0 || checkIfTodoAlreadyExists(todoName)) {
        return;
    }
    
    model.createTask(todoName);
    var todo = createNewTodo(todoName);
    inputElement.value = '';

    model.refresh();
}

function checkIfTodoAlreadyExists(todoName) {
    var todoElements = listElement.querySelectorAll('.task__name');
    var namesList = Array.prototype.map.call(todoElements, function (element) {
        return element.textContent;
    });
    return namesList.indexOf(todoName) > -1;
}

function createNewTodo(name) {
    return {
        name: name,
        status: 'todo',
        dateTime: new Date(Date.now())
    }
}



listElement.addEventListener('click', onListClick);

var inputElement = document.querySelector('.add-task__input');
inputElement.addEventListener('keydown', onInputKeydown);

var listFilters = document.querySelector('.filters');
var filterList = listFilters.querySelectorAll('.filters__item');
listFilters.addEventListener('click', onFilterClick);

