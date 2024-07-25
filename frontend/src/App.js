import Header from "./components/Header";
import React, { useEffect } from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Userblog from "./components/Userblog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
function App() {
  const dispath = useDispatch();
  const isloggedIn = useSelector((state) => state.isloggedIn);
  console.log(isloggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isloggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<Userblog />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
