import express from "express";
import {
  addBlog,
  blogDelete,
  byId,
  getAllBlogs,
  getbyUserid,
  update,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update:id", update);
blogRouter.get("/:id", byId);
blogRouter.delete("/:id", blogDelete);
blogRouter.get("/user/:id", getbyUserid);

export default blogRouter;
