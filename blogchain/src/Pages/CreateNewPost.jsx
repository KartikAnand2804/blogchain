// import React from 'react'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function CreateNewPost() {
  const apiurl = import.meta.env.VITE_SERVER_API;
  const { userInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function createNewPost() {
    const response = await axios.post(
      `${apiurl}/create-new-post`,
      {
        title: title,
        description: description,
        content: content,
      },
      { withCredentials: true }
    );
    if (response.status == 200) return <Navigate to={"/"} />;
  }

  return (
    <div className="p-[80px] bg-black h-content">
      <h1 className="text-2xl mb-6 text-white"> By {userInfo.username}</h1>
      <button
        onClick={createNewPost}
        type="button"
        className="mb-4 mt-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Post
      </button>
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <label
        htmlFor="content"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Write here.
      </label>
      <textarea
        id="content"
        rows="20"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Pen it down."
      ></textarea>
    </div>
  );
}

export default CreateNewPost;
