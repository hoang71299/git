import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Error from "./Error";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Account() {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, []);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});
  const [user,setUser] = useState({
    name: "",
    email :"",
    password:"",
    phone:"",
    address:"",
  })
  let userData =JSON.parse( localStorage.getItem("auth")) 
  useEffect(()=>{
    if(userData){
      setUser({
        name:userData.name,
        email:userData.email,
        address:userData.address,
        phone:userData.phone,
        password:''
      })
    }
  },[])

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

 const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((state) => ({ ...state, [name]: value }));
  };
  const handleChange=(e)=>{
    e.preventDefault();
    let errorSubmit ={}
    let flag = true;
    let arr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    var tenFile = file?.name;
    var duoiFile = tenFile?.split(".")?.pop() || "";
    if(user.name == ''){
      errorSubmit.name = "vui lòng nhập tên"
      flag = false
    }
    if(user.phone == ''){
      errorSubmit.phone ="vui lòng nhập số điện thoại"
      flag = false
    }
    if(user.address ==''){
      errorSubmit.phone ='vui lòng nhập địa chỉ'
      flag = false
    }

    if (file) {
      if (file.size > 1024 * 1024) {
        errorSubmit.file = "Dung lượng ảnh quá lớn";
        flag = false;
      }
      if (!arr.includes(duoiFile)) {
        errorSubmit.file = "Định dạng ảnh không được hỗ trợ";
        flag = false;
      }
    } 

    if(flag){
      setError("");
      const options = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const data = {
        name : user.name,
        email:user.email,
        password:user.password,
        phone:user.phone,
        address: user.address,
        avatar
      }
      console.log(userData.id)
      axios.post(`http://localhost:8000/api/user/update/${userData.id}`,data,options)
          .then(res =>{
            if (res.data.errors) {
              setError(res.data.errors);
            }else{
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("auth", JSON.stringify(res.data.Auth));
              toast.success("cập nhập thành công")
            } 
          })
    }else{
      setError(errorSubmit)
    }
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
        <div className="signup-form mb-2">
          {/*sign up form*/}
          <h2>New User Signup!</h2>
          <Error error={error}/>
          <form encType="multipart/form-data"  onSubmit={handleChange}>
            <input onChange={handleInput} name="name" value={user.name} type="text" placeholder="Name" />
            <input defaultValue={user.email} readOnly type="email" placeholder="Email Address" />
            <input  onChange={handleInput} name="password" value={user.password} type="password" placeholder="Password" />
            <input  onChange={handleInput} name="phone" value={user.phone} type="text" placeholder="Phone" />
            <input  onChange={handleInput} name="address" value={user.address} type="text" placeholder="Address" />
            <input  onChange={handleUserInputFile} name="avatar" type="file"  />
            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
}
