const Todo = require('../model/todo.model');


const findAllTodos = async () => Todo.find({});

const findTodoById = async (id) => Todo.findById(id);

const addTodo = async (params) => {
    const { description, done } = params;
    const todo = new Todo({ description, done });
    return todo.save();
}

const updateTodo = async (id, params) => {
    const { description, done } = params;
    const todo = new Todo.findOneAndUpdate({ _id: id }, { description, done });
    return todo;
}

const deleteTodo = async (id) => {
    return Todo.findOneAndDelete({ _id: id });
}

module.exports = {
    findAllTodos, findTodoById, addTodo, updateTodo, deleteTodo
}