import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const apiurl = import.meta.env.VITE_SERVER_API;
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get(`${apiurl}/get-all-posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);

  if (posts) {
    return (
      <div className="h-screen bg-black">
        <div className="text-white p-6">
          {posts.map((post) => {
            return (
              <div key={post._id} className="w-full mt-4 bg-black">
                <a
                  href="#"
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  dark:border-purple-800 dark:bg-black dark:hover:animate-pulse"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={post.cover}
                    alt=""
                  ></img>
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {post.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {post.description}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else
    return (
      <div className="bg-black flex flex-col items-center justify-center h-screen w-full">
        <img src="src/assets/2317146-removebg-preview.png"></img>
        <h1 className=" text-purple-800 text-4xl">Wow! such empty.</h1>
        <h3 className="text-white  mt-4 text-2xl">
          It appears that there are no posts on the platform right now. Please
          try again later.
        </h3>
      </div>
    );
}

export default Home;
