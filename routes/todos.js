const express = require('express');
const bodyParser = require('body-parser');

const TodoModel = require('../models/TodoModel');
const todoRouter = express.Router();

todoRouter.use(bodyParser.json());

todoRouter.route('/')
    .get((request, response, next) => {
        TodoModel.find(request.query)
            .then(todos => {
                response.status(200);
                response.contentType('application/json');
                response.json(todos);
            }, error => next(error))
            .catch(error => next(error));
    })
    .post((request, response, next) => {
        TodoModel.create(request.body)
            .then(todo => {
                console.log("Todo Created with ID: ", todo._id);
                response.status(200);
                response.contentType('application/json');
                response.json(todo);
            }, error => next(error))
            .catch(error => next(error))
    })
    .delete((request, response, next) => {
        TodoModel.remove().then(todo => {
            response.status(200);
            response.contentType('text/plain');
            response.json("All todos are deleted");
        })
    })
    .put((request, response, next) => {
        response.status(400);
        response.contentType('text/plain');
        response.json("You are prohibited from performing this task");
    });

todoRouter.route('/:_id')
    .get((request, response, next) => {
        TodoModel.findById(request.params._id)
            .then(todo => {
                response.status(200);
                response.contentType('application/json');
                response.json(todo);
            }, error => next(error))
            .catch(error => next(error));
    })
    .post((request, response, next) => {
        response.status(400);
        response.contentType('text/plain');
        response.json("You are prohibited from performing this task");
    })
    .delete((request, response, next) => {
        TodoModel.findByIdAndDelete().then(todo => {
            console.log("Todo deleted with name: ", todo.todoName);
            response.status(200);
            response.contentType('text/plain');
            response.json(todo);
        })
    })
    .put((request, response, next) => {
        TodoModel.findByIdAndUpdate(request.params._id, {$set: request.body})
            .then(todo => { 
                console.log("Todo Updated with ID: ", todo._id);
                response.status(200);
                response.contentType('application/json');
                response.json(todo);
            }, error => next(error))
            .catch(error => next(error))
    });


module.exports = todoRouter;