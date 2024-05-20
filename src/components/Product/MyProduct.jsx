import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyProduct() {
  const token = localStorage.getItem("token") || "";
  const auth = JSON.parse(localStorage.getItem("auth"))
  // console.log(auth)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const handleAddNew = ()=>{
    navigate('/create-product')
  }
  useEffect(() => {
    if (token === "") {
      navigate("/");
    }else{
      const options = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios.get(`http://localhost:8000/api/user/my-product`,options)
        .then(res =>{
          const value = Object.values(res.data.data)
          setData(value)
        })
    }
  }, []);
  // console.log(data)
  const handleDelete = (id)=>{
    const options = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(`http://localhost:8000/api/user/product/delete/${id}`,options)
      .then(res =>{
        const value = Object.values(res.data.data)
        setData(value)
        toast.success("xóa sản phẩm thành công")
      })
  }
  return (
    <div className="col-sm-9">
      <div className="table-responsive cart_info">
        <table className="table table-striped table-bordered  ">
          <thead>
            <tr className="cart_menu">
              <td>STT</td>
              <td className="image text-center h4 ">image</td>
              <td className="description text-center h4 ">name</td>
              <td className="price  text-center h4 ">price</td>
              <td className="total text-center h4 ">action</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data.map((item,index)=>(
              <tr key={item.id}>
                <td>{index+1}</td>
                <td className="cart_product text-center">
                  <a href="">
                    <img style={{width:"100px",height:"100px"}} src={`http://127.0.0.1:8000/upload/product/${auth.id}/${JSON.parse(item.image)[0]}`} alt="" />
                  </a>
                </td>
                <td className="cart_description text-center">
                  <h4>
                    <Link to="">{item.name}</Link>
                  </h4>
                </td>
                <td className="cart_price text-center">
                  <p>${item.price}</p>
                </td>
                <td className="cart_total text-center">
                  <button className="btn-primary" onClick={()=>navigate(`/update-product/${item.id}`)} style={{ marginRight: "20px" }}>Edit</button>
                  <button className="btn-danger" onClick={()=>handleDelete(item.id)} >Delete</button>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right" style={{ marginBottom: "20px" }}>
          <button onClick={handleAddNew}  className="btn btn-warning " style={{}}>
            Add new 
          </button>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default MyProduct;
