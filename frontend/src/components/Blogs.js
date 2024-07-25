import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";
const Blogs = () => {
  const [blog, setblogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/blog")
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      setblogs(data.blogs);
    });
  }, []);
  return (
    <div>
      {blog &&
        blog.map((iblog, index) => (
          <Blog
            key={iblog._id}
            id={iblog._id}
            isUser={localStorage.getItem("userId") === iblog.user._id}
            title={iblog.title}
            description={iblog.description}
            imageUrl={iblog.image}
            username={iblog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
