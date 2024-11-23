const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('../models/todo');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to MongoDB
mongoose.connect(process.env.DB)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = function (app) {
    // GET Route
    app.get('/todo', async (req, res) => {
        try {
            const data = await Todo.find(); // Find all todos
            res.render('todo', { todos: data });
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred while fetching the todo list.');
        }
    });

    // POST Route
    app.post('/todo', urlencodedParser, async (req, res) => {
        try {
            const newTodo = new Todo(req.body); // Create a new Todo document
            const data = await newTodo.save(); // Save to database
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred while saving the todo item.');
        }
    });

    // DELETE Route
    app.delete('/todo/:item', async (req, res) => {
        try {
            const itemToDelete = req.params.item.replace(/-/g, ' '); // Convert URL-safe item back to normal text
            const data = await Todo.deleteOne({ item: itemToDelete }); // Delete the item
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred while deleting the todo item.');
        }
    });
};
