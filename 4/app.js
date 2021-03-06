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

var filterStatus={
    TODO:'todo',
    DONE:'done',
    ALL:'all'
}


function Statistic(countTodoDone) {

    this.countTotal = document.querySelector(".statistic__total"),
    this.countDone = document.querySelector(".statistic__done"),
    this.countLeft = document.querySelector(".statistic__left"),
    this.stats ={
        todo:countTodoDone.countTodo,
        done:countTodoDone.countDone,
        all:this.todo+this.done // Как all присвоить todo+done?
    }

}

Statistic.prototype.setCountDoneTodo = function(done,todo)
{
    this.stats.done = done;
    this.stats.todo = todo;
    this.stats.all = done + todo;
}
Statistic.prototype.renderStats = function () {
    this.countTotal.textContent = this.stats.all;
    this.countDone.textContent = this.stats.done;
    this.countLeft.textContent = this.stats.todo;
    console.dir(this.stats);
}

Filter.prototype.getCountTodoDone = function () {
    var countTodoDone = {
        countTodo: this.getFilteredFromList(FileList.TODO),
        countDone: this.getFilteredFromList(FileList.DONE)
    }
    return countTodoDone;
}

Filter.prototype.getFilteredFromList = function (filter) {
    return Array.prototype.filter.call(todoList, function (item) {
        return item.status === this;
    }, filter);
}

Filter.prototype.renderFilter = function () {
    var filterList;
    if (this.currentFilter === filterStatus.ALL) {

        filterList = this.todoList;
    } else {
        filterList = this.getFilteredFromList(this.currentFilter);
    }

    filterList.forEach(function (item) {
        listElement.appendChild(addTodoFromTemplate(item));
    });

}

function Filter(todoList) {
    this.todoList = todoList;
    this.currentFilter = filterStatus.ALL;
    this.renderFilter();
}


Filter.prototype.changeCurrentFilter = function (newFilter) {
    if (newFilter === this.currentFilter) return;


    listElement.innerHTML = '';
    this.currentFilter = newFilter;
    this.renderFilter();
}


function Model(tdList, stats) {
    this.statistic = stats;
    //this.status = filterStatus.ALL,
     this.todoList = tdList;
    var listElement = document.querySelector('.list');
}


Model.prototype.createTask = function (todo) {
         this.todoList.unshift(createNewTodo(todo));
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
Model.prototype.r2efresh = function () {
        var newElement = templateContainer.querySelector('.task').cloneNode(true);

        var selectedFilter = document.querySelector(".filters__item_selected");
        selectedFilter.classList.remove("filters__item_selected");

        Array.prototype.find.call(document.querySelectorAll(".filters__item"), function (item) {
            return item.getAttribute("data-filter") === this.status;
        }, this).classList.add("filters__item_selected");

        //var newList = this.stats.getFunc(this.status).call(this).map(addTodoFromTemplate);
  


};
Model.prototype.setStatus = function (status) {
        this.status = status;
    }



var filter = new Filter(todoList);
var statistic = new Statistic(filter.getCountTodoDone());
var model = new Model(todoList,statistic);


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
}
Model.prototype.changeTodoStatus = function (todoContent) {
    var index = this.getIndex(todoContent);
    var newStatus;
    if (todoList[index].status === 'todo'){
        this.statistic.stats.todo++;
        this.statistic.stats.done--;
        newStatus = 'done'}
        else {
        this.statistic.stats.todo--;
        this.statistic.stats.done++;
        newStatus = 'todo'
    }
    todoList[index].status = newStatus;
    todoList[index].dateTime = new Date(Date.now());
    this.statistic.renderStats();
    setTodoStatusClassName()


};
function onFilterClick(event) {

    var target = event.target;
    if (target.classList.contains("filters__item")) {
        var newFilter = target.getAttribute("data-filter");
        filter.changeCurrentFilter(newFilter);
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

