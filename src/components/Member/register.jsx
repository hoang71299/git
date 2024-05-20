import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "../Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    level: 0,
  });
  const [error, setError] = useState({});
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const handleUserInputFile = (e) => {
    const file = e.target.files;

    //send file to api server
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(file[0]);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    let arr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    var tenFile = file?.name;
    var duoiFile = tenFile?.split(".")?.pop() || "";
    if (input.name === "") {
      errorSubmit.name = "Tên này chưa được nhập";
      flag = false;
    }
    if (input.email === "") {
      errorSubmit.email = "Chưa nhập email này";
      flag = false;
    } else if (!isEmail(input.email)) {
      errorSubmit.email = "Email này không đúng định dạng";
      flag = false;
    }

    if (input.password === "") {
      errorSubmit.password = "Chưa nhập Mật khẩu này ";
      flag = false;
    }

    if (input.phone === "") {
      errorSubmit.phone = "Chưa nhập Số điện thoại ";
      flag = false;
    }

    if (input.address === "") {
      errorSubmit.address = "Chưa nhập địa chỉ này ";
      flag = false;
    }

    if (!file) {
      errorSubmit.file = "Chưa nhập file này";
      flag = false;
    } else {
      if (file.size > 1024 * 1024) {
        errorSubmit.file = "Dung lượng ảnh quá lớn";
        flag = false;
      }
      if (!arr.includes(duoiFile)) {
        errorSubmit.file = "Định dạng ảnh không được hỗ trợ";
        flag = false;
      }
    }

    
    if (flag) {
      setError("");
      const { name, email, password, phone, address, level } = input;
      const data = {
        name,
        email,
        password,
        phone,
        address,
        avatar,
        level,
      };
    
      axios.post("http://127.0.0.1:8000/api/register", data)
        .then(res => {
          console.log(res);
          if (res.data.errors) {
            setError(res.data.errors);
          } else if (res.data.errors && res.data.errors.email) {
            setError(res.data.errors.email);
          } else {
            
            alert("đăng ký thành công");
            navigate('/login')
          }
        })
        .catch(error => console.log(error));
    } else {
      setError(errorSubmit);
    }
  };
  // console.log(input)
  // console.log(avatar)
  // console.log(file)
  return (
    <>
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>New User Signup!</h2>
          <Error error={error} />
          <form encType="multipart/form-data" onSubmit={handleForm}>
            <input
              onChange={handleInput}
              value={input.name}
              type="text"
              name="name"
              placeholder="Name"
            />
            <input
              onChange={handleInput}
              value={input.email}
              type="text"
              name="email"
              placeholder="Email Address"
            />
            <input
              onChange={handleInput}
              value={input.password}
              type="password"
              name="password"
              placeholder="Password"
            />
            <input
              onChange={handleInput}
              value={input.phone}
              type="tel"
              name="phone"
              placeholder="Phone"
            />
            <input
              onChange={handleInput}
              value={input.address}
              type="text"
              name="address"
              placeholder="Address"
            />
            <input
              onChange={handleUserInputFile}
              type="file"
              name="avatar"
              className="form-control "
            />
            <input
              readOnly
              type="number"
              name="level"
              value={input.level}
              placeholder="level"
            />
            <button type="submit" className="btn btn-default">
              Signup
            </button>
            
          </form>
          <ToastContainer />
        </div>
        {/*/sign up form*/}
      </div>
    </>
  );
}
