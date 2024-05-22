const express = require('express')
const { connectDB } = require('./connection')
const cors = require('cors');
const todo = require('./models/todo')

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

app.post("/get-todos", async (req, res) => {
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
    await todo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        desription: req.body.desription,

    })
    res.status(200).json("ToDo updated successfully")
}
)



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

