import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Header() {
  const apiurl = import.meta.env.VITE_SERVER_API;

  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    try {
      axios
        .get(`${apiurl}/profile`, {
          withCredentials: true,
        })
        .then((response) => {
          const userData = response.data;
          setUserInfo(userData);
        });
    } catch (error) {
      console.error(error.response.data);
    }
  }, []);
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-black dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          /> */}
          <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-purple-700 hover:animate-pulse">
            The Blogchain
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          {userInfo ? (
            <div className="flex gap-4 items-center">
              <button className="flex bg-purple-800 text-white font-bold rounded-xl px-6 py-2 hover:bg-purple-700">
                <a href="/create-post" className="text-white">
                  Create a new Post
                </a>
              </button>
            </div>
          ) : (
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="/login"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Login
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
