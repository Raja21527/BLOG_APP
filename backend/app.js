import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-router.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use("/blog", blogRouter);
const port = 5000;

mongoose
  .connect(
    "mongodb+srv://raja:KNXUre66PA5Lh7o7@blogsdata.cqic3tr.mongodb.net/?retryWrites=true&w=majority&appName=BlogsData"
  )
  .then(() => {
    app.listen(port);
  })
  .then(() => {
    console.log(`Server started running at port:${port}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// KNXUre66PA5Lh7o7
