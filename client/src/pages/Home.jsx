import React from "react";
import Swal from "sweetalert2";
const Home = () => {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/get-todos/");
    const data = await response.json();

    setTodos(data);
  };
  useEffect(() => {
    getPosts();
  }, [posts]);

  const deletePost = async (id) => {
    const response = await fetch("http://localhost:3000/delete-todo/:id" + id, {
      method: "DELETE",
    });
    if (response.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Blog has been deleted successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "Failed to delete blog",
        icon: "error",
      });
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <form className="bg-gray-900 text-white p-6 rounded-lg border shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold">Add your todo list</h2>

          <div className="mb-4">
            <label htmlFor="text" className="block  font-bold mb-2">
              Title :
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 font-bold border rounded-xl focus:outline-none focus:ring-2 bg-gray-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="text" className="block  font-bold mb-2">
              Description :
            </label>
            <input
              type="text"
              id="description"
              className="w-full px-4 py-2 font-bold border rounded-xl focus:outline-none focus:ring-2 bg-gray-900"
            />
          </div>

          <button
            onClick={() => {
              Swal.fire({
                title: "Success!",
                text: "Your task has been added successfully!",
                icon: "success",
                confirmButtonText: "Okay",
              });
            }}
            type="submit"
            className="w-full font-bold bg-gray-900 text-white py-2 focus:outline-none focus:ring-2 rounded-xl border hover:bg-gray-800 hover:transition-colors duration-400"
          >
            Submit
          </button>
        </form>
        <h2 className="text-white font-bold text-xl mt-5 text-center">Tasks</h2>
        <div className="bg-gray-900 text-white p-5 mt-5 rounded-lg border shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">title</h3>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Success!",
                  text: "Your task has been deleted successfully!",
                  icon: "success",
                  confirmButtonText: "Okay",
                });
              }}
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
          <p className="text-gray-300">description</p>
        </div>
      </div>
    </>
  );
};

export default Home;
