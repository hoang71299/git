import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const [getItem,setItem] = useState('')
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/blog")
      .then(res => setItem(res.data.blog))
      .catch(error=> console.log(error))
  },[])
  
  function fetchData(){
    if(Object.keys(getItem).length > 0){
      return getItem.data.map((value,key)=>(
        <div className="single-blog-post" key={value.id}>
        <h3>{value.title}</h3>
        <div className="post-meta">
          <ul>
            <li>
              <i className="fa fa-user" /> Mac Doe
            </li>
            <li>
              <i className="fa fa-clock-o" /> 1:33 pm
            </li>
            <li>
              <i className="fa fa-calendar" /> DEC 5, 2013
            </li>
          </ul>
          <span>
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-half-o" />
          </span>
        </div>
        <a href="">
          <img src={`http://localhost:8000/upload/blog/image/${value.image}`} alt="" />
        </a>
        <p>
          {value.description}
        </p>
        <Link to={"/blog/detail/" +value.id} className="btn btn-primary" href="">
          Read More
        </Link>
      </div>
      ))
    }
  }
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
          {fetchData()}
        {/* <div className="single-blog-post">
          <h3>Girls Pink T Shirt arrived in store</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
            <span>
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half-o" />
            </span>
          </div>
          <a href="">
            <img src="/frontend/images/blog/blog-two.jpg" alt="" />
          </a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <a className="btn btn-primary" href="">
            Read More
          </a>
        </div>
        <div className="single-blog-post">
          <h3>Girls Pink T Shirt arrived in store</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
            <span>
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half-o" />
            </span>
          </div>
          <a href="">
            <img src="/frontend/images/blog/blog-three.jpg" alt="" />
          </a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <a className="btn btn-primary" href="">
            Read More
          </a>
        </div> */}
        <div className="pagination-area">
          <ul className="pagination">
            <li>
              <a href="" className="active">
                1
              </a>
            </li>
            <li>
              <a href="">2</a>
            </li>
            <li>
              <a href="">3</a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-angle-double-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
