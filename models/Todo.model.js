const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
    name: String,
    description: String
})

let TodoModel = mongoose.model('my-todo', TodoSchema)

module.exports = TodoModel;