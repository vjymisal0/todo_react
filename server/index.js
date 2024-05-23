const express = require('express')
const { connectDB } = require('./connection')
const cors = require('cors');
const todo = require('./models/todo')
// env

require('dotenv').config()
const PORT = process.env.PORT || 3000



const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    new todo({
        title: "First todo",
        description: "This is the first todo"
    }).save()

    res.send("Hello World")
}
)

app.post("/add-todo", async (req, res) => {
    // console.log(req.body.title)
    // console.log(req.body.desription)
    const newTodo = new todo({
        title: req.body.title,
        description: req.body.description,
    })
    await newTodo.save()
    res.status(200).json("ToDo created successfully")
})

app.get("/get-todos", async (req, res) => {
    const todos = await todo.find()
    res.status(200).json(todos)
}
)

app.delete("/delete-todo/:id", async (req, res) => {
    await todo.findByIdAndDelete(req.params.id)
    res.status(200).json("ToDo deleted successfully")
}
)

app.put("/update-todo/:id", async (req, res) => {
    console.log(req.body.title)
    console.log(req.body.description)

    const todoUpdate = await todo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
    })

    await todoUpdate.save()

    res.status(200).json("ToDo updated successfully")
}
)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

