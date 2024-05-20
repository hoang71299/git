import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateProduct() {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const defaultInput = {
    'name':'',
    'price':'',
    'category':'',
    'brand':'',
    'company':'',
    'detail':'',
    'status': 0,
    'sale': '',
  }
  const inputFile = useRef(null)
  const [input,setInput] = useState(defaultInput)
  const [category,setCategory] = useState([]);
  const [brand,setBrand] = useState([]);
  const [avatar,setAvatar] = useState([])
  const [error,setError] = useState({})
  
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }else{
      axios.get(`http://127.0.0.1:8000/api/category-brand`)
        .then(res =>{
          setCategory(res.data.category)
          setBrand(res.data.brand)
        })
    }
  }, []);
  const handleChange=(e)=>{
    const name  = e.target.name;
    const value = e.target.value
    // console.log(name , value)
    setInput(state =>({...state,[name]:value}))
  }
  const handleFile = (e)=>{
    console.log(e.target.files)
    setAvatar(e.target.files)
  }
  // console.log(avatar)
  // console.log(avatar)
  // console.log(input)
  const handleForm = (e)=>{
    e.preventDefault();
    let errorSubmit = {};
    let flag = true 
    let arr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    var tenFile = avatar[0]?.name || "";
    var duoiFile = tenFile.split(".").pop() || "";
    if(input.name == ""){
      errorSubmit.name = "vui lòng nhập tên"
      flag = false
    }
    if(input.price == ""){
      errorSubmit.price = "vui lòng nhập giá"
      flag = false
    }
    if(input.category == ""){
      errorSubmit.category = "vui lòng chọn danh mục"
      flag = false
    }
    if(input.brand == ""){
      errorSubmit.brand = "vui lòng chọn hãng"
      flag = false
    }
    if(input.company == ""){
      errorSubmit.company = "vui lòng chọn cong ty"
      flag = false
    }
    if(input.detail == ""){
      errorSubmit.detail = "vui lòng nhập chi tiết"
      flag = false
    }

    if(avatar.length == 0){
      errorSubmit.file = "vui lòng nhập file"
      flag = false
    }else{ 
      if (avatar[0]?.size > 1024 * 1024) {
        errorSubmit.size = "Dung lượng ảnh quá lớn";
        flag = false;
      }
      if (!arr.includes(duoiFile)) {
        errorSubmit.type = "Định dạng ảnh không được hỗ trợ";
        flag = false;
      }
    }

    if(flag){
      setError("");
      const {name,price,category,brand,company,detail,status,sale}= input
      const options = {
        headers: {
          'Authorization': "Bearer " + token,
          "Content-Type": "multipart/form-data",
          'Accept': "application/json",
        },
      };
      let formData = new FormData()
      formData.append('name',name)
      formData.append('price',price)
      formData.append('category',category)
      formData.append('brand',brand)
      formData.append('company',company)
      formData.append('detail',detail)
      formData.append('status',status)
      formData.append('sale',sale)
      // formData.append('file[]',avatar[0])
      Object.keys(avatar).map(item=>{
        formData.append('file[]',avatar[item])
      })
      axios.post("http://127.0.0.1:8000/api/user/product/add",formData,options)
        .then(res=>{
          if (res.data.errors) {
            setError(res.data.errors);
          }else{
            toast.success("thêm sản phẩm thành công")
            setInput(defaultInput)
            inputFile.current.value = "";
          }
        })
    }else{
      setError(errorSubmit)
    }
  }
  
  return (
    <>
      <div className="col-sm-9" style={{marginBottom:"30px"}}>
        <div className="blog-post-area">
          <h2 className="title text-center">Create product</h2>
          <div className="signup-form">
            {/*sign up form*/}
            <h2>Create new product</h2>
            <Error error={error} />
            <form encType="multipart/form-data" onSubmit={handleForm}>
              <input onChange={handleChange} value={input?.name} name="name" type="text" placeholder="Name" />
              <input onChange={handleChange} value={input?.price} name="price" type="number" placeholder="Price" />
              <select onChange={handleChange} value={input?.category} name="category"  >
                <option value="">Please choose category</option>
                {category.length > 0  && category.map((item)=>(
                  <option key={item.id} value={item.id}>{item.category}</option>
                ))}
              </select>
              <select value={input?.brand} onChange={handleChange}  name="brand" >
                <option value="">Please choose brand</option>
                {brand.length > 0  && brand.map((item)=>(
                  <option key={item.id} value={item.id}>{item.brand}</option>
                ))}
              </select>
              <select value={input?.status} onChange={handleChange} name="status" >
                <option value="0">sale</option>
                <option value="1">new</option>
              </select>
              {parseInt(input.status) === 0 && (
                <div className="row ">
                  <div className="col-sm-8 col-lg-4">
                    <input onChange={handleChange} name="sale" min={1} max={90} type="number" />
                  </div>
                  <div className="col-sm-4 col-lg-2">
                    <span className="h3">%</span>
                  </div>
                </div>
              )}
              <input value={input?.company} onChange={handleChange} name="company" type="text" placeholder="Company profile" />
              <input ref={inputFile} onChange={handleFile} type="file"  />
              <textarea value={input?.detail}   onChange={handleChange} name="detail" placeholder="detail" >         
              </textarea>
              <button type="submit" className="btn btn-default">
                Create
              </button>
            </form>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
}
