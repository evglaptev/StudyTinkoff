"use strict";

var listElement = document.querySelector('.list');
var itemElementList = listElement.children;


var templateElement = document.getElementById('todoTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

// сформируем задачки
var todoList = [
{
    name: 'Позвонить в сервис',
    status: 'todo'
},
{
    name: 'Купить хлеб',
    status: 'done'
},
{
    name: 'Захватить мир',
    status: 'todo'
},
{
    name: 'Добавить тудушку в список',
    status: 'todo'
}
]

var filter={
    TODO:'todo',
    DONE:'done',
    ALL:'all'
}

var model = {
    status:-1,
    todoList: [],
    init: function (todoList) {
        this.todoList = todoList;
        this.status=filter.ALL;
        this.refresh();
    },
    getAllTasks: function () {
        return this.todoList;
    },
    getTodoTasks: function () {
        return Array.prototype.filter.call(this.todoList, function (item) {
            return item.status === 'todo'
        })
    },
    getDoneTasks: function () {
        return Array.prototype.filter.call(this.todoList, function (item) {
            return item.status === 'done'
        })
    },
    createTask: function (todo) {
        todoList.unshift(createNewTodo(todo))
        //todoList.push(createNewTodo(todo))
    },

    changeTodoStatus: function (todoContent) {
        console.dir(todoContent);

        var index = this.getIndex(todoContent);
        todoList[index].status = todoList[index].status === 'todo' ? 'done' : 'todo';

    },
    deleteTask: function (todoContent) {
        var index = this.getIndex(todoContent);

        console.dir(index);
        todoList.splice(index,1);
    },
    getIndex: function (todoContent) {
        return this.todoList
        .map(function (item) {
            return item.name
        })
        .indexOf(todoContent)
    },
    getFunc: function () {
        console.log("dsf");
        if(this.status === filter.all) return this.getAllTasks;
        if(this.status === filter.done) return this.getDoneTasks;
        return this.getTodoTasks;
    },
    refresh: function () {
        var newElement = templateContainer.querySelector('.task').cloneNode(true);
        var listElement = document.querySelector('.list');
        listElement.textContent = "";
        var func;

        var selectedFilter = document.querySelector(".filters__item_selected");
        selectedFilter.classList.remove("filters__item_selected");
        if (this.status === filter.ALL) {
            func = this.getAllTasks;

                
        }
        if (this.status === filter.DONE) {
            func = this.getDoneTasks;
        }
        if (this.status === filter.TODO) {
            func = this.getTodoTasks;
        }
        Array.prototype.find.call(document.querySelectorAll(".filters__item"), function (item) {
            return item.getAttribute("data-filter") === this.status;
        }, this).classList.add("filters__item_selected");
        
        var newList = func.call(this).map(addTodoFromTemplate);
        newList.forEach(function (element) {
            listElement.appendChild(element);

        })
        document.querySelector(".statistic__total").textContent = this.getAllTasks().length;
        document.querySelector(".statistic__done").textContent = this.getDoneTasks().length;
        document.querySelector(".statistic__left").textContent = this.getTodoTasks().length;
    },
    setStatus: function(status){
        this.status = status;
}
    



}

model.init(todoList);

function addTodoFromTemplate(todo) {
    var newElement = templateContainer.querySelector('.task').cloneNode(true);
    newElement.querySelector('.task__name').textContent = todo.name;
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
    //insertTodoElement(addTodoFromTemplate(todo));
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
        status: 'todo'
    }
}



listElement.addEventListener('click', onListClick);

var inputElement = document.querySelector('.add-task__input');
inputElement.addEventListener('keydown', onInputKeydown);

var listFilters = document.querySelector('.filters');
var filterList = listFilters.querySelectorAll('.filters__item');
listFilters.addEventListener('click', onFilterClick);

