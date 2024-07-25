import React, { useState } from "react";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/myblogs"));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageUrl,
        user: localStorage.getItem("userId"),
      });
      return res.data;
    } catch (err) {
      console.error("Error:", err.message);
      throw new Error("Failed to add blog");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(99deg, rgba(1,16,37,0.9572649572649573) 66%, rgba(89,93,221,0.14387464387464388) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
          marginLeft={15}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            POST
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            ImageUrl
          </InputLabel>
          <TextField
            name="imageUrl"
            onChange={handleChange}
            value={inputs.imageUrl}
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
