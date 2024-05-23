import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-900 text-white p-6 rounded-lg border shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 ">
          Add todo tasks here
        </h2>

        <div className="mb-4">
          <label
            htmlFor="text"
            className="block  font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="text"
            className="block  font-medium mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
