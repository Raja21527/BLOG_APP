import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const Userblog = () => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            username={user.name}
          />
        ))}
    </div>
  );
};

export default Userblog;
