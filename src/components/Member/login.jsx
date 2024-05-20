import axios from "axios";
import React, { useState } from "react";
import Error from "../Error";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log()
    // console.log(e.target.value)
    setInput((state) => ({ ...state, [name]: value }));
  };
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const handleForm = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    if (input.email == "") {
      errorSubmit.email = "Chưa nhập email";
      flag = false;
    } else if (!isEmail(input.email)) {
      errorSubmit.email = "Không đúng định dạng email";
      flag = false;
    }
    if (input.password == "") {
      errorSubmit.password = "chưa nhập password";
      flag = false;
    }
    setError(errorSubmit);
    if (flag) {
      const data = {
        email: input.email,
        password: input.password,
        level: 0,
      };
      // console.log(data)
      axios
        .post("http://localhost:8000/api/login", data)
        .then((response) => {
          if (response.data.errors) {
            setError(response.data.errors);
          } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("auth", JSON.stringify(response.data.Auth));
            setInput({ email: "", password: "" });
            // console.log(response)
            navigate("/");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  // console.log(input)
  return (
    <>
      <div className="col-sm-4 col-sm-offset-1">
        <div className="login-form">
          {/*login form*/}
          <h2>Login to your account</h2>
          <Error error={error} />
          <form onSubmit={handleForm}>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
            <span>
              <input type="checkbox" className="checkbox" />
              Keep me signed in
            </span>
              <button type="submit" className="btn btn-default">
                Login
              </button>
              <button onClick={() => navigate("/register")}>Register</button>
          </form>
        </div>
        {/*/login form*/}
      </div>
    </>
  );
}
