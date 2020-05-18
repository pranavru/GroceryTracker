const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todos = new Schema({
    todoName: {
        type: String,
        default: '',
    },
    todoCategory: {
        type: String,
        default: 'Home'
    },
    todoDescription: {
        type: String,
        default: ''
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    deadlineMet : {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    validateBeforeSave: true,
});

module.exports = mongoose.model('TodoModel', Todos);

