import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setisSignip] = useState(false);
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    console.log(res);
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={400}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        boxShadow="-10px 15px 20px #011025"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
      >
        <Typography variant="H2" padding={3} textAlign="center">
          {isSignup ? "Fill the details buddy" : "Enter Your Details"}
        </Typography>
        {isSignup && (
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            margin="normal"
            placeholder="Name"
          />
        )}
        <TextField
          name="email"
          onChange={handleChange}
          value={inputs.email}
          type={"email"}
          margin="normal"
          placeholder="Email"
        />
        <TextField
          name="password"
          onChange={handleChange}
          value={inputs.password}
          type="password"
          margin="normal"
          placeholder="password"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
          color="warning"
        >
          submit
        </Button>
        <Button
          onClick={() => setisSignip(!isSignup)}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          {isSignup ? "Login" : "signup"}
        </Button>
      </Box>
    </form>
  );
};

export default Auth;
