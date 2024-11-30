const express = require('express');
const app = express();

app.set("view engine", 'ejs')

app.use(express.static("./assets"))

require('dotenv').config();

let todoController = require('./controllers/todoController')
todoController(app)


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));