import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-todos/");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch todos",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your task has been added successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        });
        setTitle(""); // Clear the title field
        setDescription(""); // Clear the description field
        getTodos();
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Failed to add the task!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the task",
        icon: "error",
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-todo/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Todo has been deleted successfully",
          icon: "success",
        });
        getTodos();
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to delete todo",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the task",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-lg:p-4 min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <form
        onSubmit={handleAddTodo}
        className="bg-gray-900 mt-8 text-white p-6 rounded-lg border shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold">Add your todo list</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 font-bold border rounded-xl focus:outline-none focus:ring-2 bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 font-bold border rounded-xl focus:outline-none focus:ring-2 bg-gray-800 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full font-bold bg-gray-800 text-white py-2 focus:outline-none focus:ring-2 rounded-xl border hover:bg-gray-700 hover:transition-colors duration-400"
        >
          Submit
        </button>
      </form>
      <h2 className="text-white font-bold text-xl mt-5 text-center">Tasks</h2>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="bg-gray-800 text-white p-5 mt-5 rounded-lg border shadow-lg w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">{todo.title}</h3>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
          <p className="text-gray-300">{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
