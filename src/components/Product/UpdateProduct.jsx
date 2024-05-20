import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
function UpdateProduct() {
  const token = localStorage.getItem("token") || "";
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const defaultInput = {
    name: "",
    price: "",
    category: "",
    brand: "",
    company: "",
    detail: "",
    status: 0,
    sale: "",
  };
  const [input, setInput] = useState(defaultInput);
  const [image,setImage] = useState([])
  const fetchCategory = () => {
    axios.get(`http://127.0.0.1:8000/api/category-brand`).then((res) => {
      setCategory(res.data.category);
      setBrand(res.data.brand);
    });
  };
  const fetchProduct = () => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/user/product/${params.id}`, options)
      .then((res) => {
        setInput({
          name: res.data.data.name,
          price: res.data.data.price,
          category: res.data.data.id_category,
          brand: res.data.data.id_brand,
          sale: res.data.data.sale,
          status: res.data.data.status,
          company: res.data.data.company_profile,
          detail: res.data.data.detail,
        });
        setImage(res.data.data.image)
        // console.log(res.data.data);
      });
  };
  useEffect(() => {
    if (token === "") {
      navigate("/");
    } else {
      fetchCategory();
      fetchProduct();
    }
  }, []);
  // console.log(input);
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update Product</h2>
        <div className="signup-form">
          {/*sign up form*/}
          <h2>Update product!</h2>
          <form action="#">
            <input value={input.name} type="text" placeholder="Name" />
            <input
              value={input.price}
              name="price"
              type="number"
              placeholder="Price"
            />
            <select value={input.category} name="category">
              <option value="">Please choose category</option>
              {category.length > 0 &&
                category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category}
                  </option>
                ))}
            </select>
            <select value={input.brand} name="brand">
              <option value="">Please choose brand</option>
              {brand.length > 0 &&
                brand.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.brand}
                  </option>
                ))}
            </select>
            <select value={input.status} name="status">
              <option value="0">sale</option>
              <option value="1">new</option>
            </select>
            {parseInt(input.status) === 0 && (
              <div className="row">
                <div className="col-sm-8 col-lg-4">
                  <input name="sale" min={1} max={90} type="number" />
                </div>
                <div className="col-sm-4 col-lg-2">
                  <span className="h3">%</span>
                </div>
              </div>
            )}
            <input value={input.company} name="company" type="text" placeholder="Company profile" />
            <input type="file" />
            {image.length>0 && image.map((item,index)=>(
              <div className="update-image" key={index}>
                <img
                  style={{ width: "120px", height: "120px" }}
                  src={`http://localhost:8000/upload/product/${auth.id}/${item}`}
                  alt=""
                />
                <input className="checkbox" type="checkbox" />
              </div>
            ))}
            <textarea value={input.company} name="detail" placeholder="detail"></textarea>
            <button
              type="submit"
              style={{ marginBottom: "20px" }}
              className="btn btn-lg btn-default"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
