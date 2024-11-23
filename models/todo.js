const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
    item: String
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo