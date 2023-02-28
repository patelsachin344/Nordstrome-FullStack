import React from "react";
import {
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContentText,
  // DialogTitle,
  IconButton,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { FormControl } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import DialogContent from '@mui/material/DialogContent';
// import DialogContent from "@mui/material/DialogContent";
import {
  loginLoading,
  loginError,
  loginSuccess,
} from "../../Features/Login/actions";
import { useEffect, useState } from "react";
import { registerSuccess } from "../../Features/Register/actions";

import { useContext } from "react";
import { SignUpContex } from "../../Contex/SignupContex";

const intial = {
  email: "",
  password: "",
};
export const Login = () => {
  const [form, setForm] = useState(intial);
  const [data, setData] = useState();
  const [err, setErr] = useState();

  const { userData } = useSelector((state) => ({
    userData: state.loginState.userData,
  }));

  const dispatch = useDispatch();

  const login = () => {
    fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => setErr(error));
  };
  useEffect(() => {
    getUsers();
  }, [data]);

  // console.log(userData, "UserData");

  useEffect(() => {
    if (data) {
      if (data.error) {
        alert(data.error);
        setData("");
      } else {
        console.log(data, "token add");
        localStorage.setItem("token", JSON.stringify(data));
      }
    }
  }, [data]);

  const token = JSON.parse(localStorage.getItem("token")) || "";

  let autho = "Bearer " + token.token;

  function getUsers() {
    dispatch(loginLoading());
    if (data) {
      fetch("http://localhost:5000/users/logedin", {
        method: "GET",
        headers: {
          Authorization: autho,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch(loginSuccess(res));
          // if (res.user) {
          //   localStorage.setItem("userData", JSON.stringify(res.user));
          // }
        })
        .catch((err) => {
          dispatch(loginError(err));
        });
    }
  }

  const { handleLogin } = useContext(SignUpContex);
  const handleClickOpen = () => {
    login();
  };

  const handleRegister = () => {
    dispatch(registerSuccess(false));
  };

  const handleEmailChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setForm({ ...form, [prop]: event.target.value });
    // findUser();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (userData.user) {
    handleLogin();
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="formLog">
        <div className="staticTextOne">Welcome back!</div>
        <div className="staticTextTwo">Sign in with the same info</div>

        <FormControl
          size="medium"
          sx={{ m: "auto", mt: "20px", mb: "10px", width: "350px" }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ fontSize: "12px" }}
          >
            Email
          </InputLabel>
          <OutlinedInput
            label="Email"
            sx={{ fontSize: "12px" }}
            name="email"
            onChange={handleEmailChange}
          />
        </FormControl>

        <FormControl
          size="medium"
          sx={{ m: "auto", mt: "10px", mb: "10px", width: "350px" }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ fontSize: "12px" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            sx={{ fontSize: "12px" }}
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className="staticTextThree">Forgot password?</div>
        <div className="staticTextFour">
          <input className="checkBox" type="checkbox" />
          <label> Keep me signed in.</label>
        </div>

        <button onClick={handleClickOpen} className="signInButton">
          Sign in
        </button>
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle width={"500px"} id="alert-dialog-title">
            {"Alert"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {form.email === "" || form.password === ""
                ? "Please enter the Email and Password"
                : user.length === 0
                ? "Invalid email id"
                : user[0].password != form.password
                ? "Invalid Password"
                : ""}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} backgroundColor="red" autoFocus>
              Try again
            </Button>
          </DialogActions>
        </Dialog> */}

        <div className="staticTextTwo">
          Dont have an account?
          <Link to={"/register"} onClick={handleRegister}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
