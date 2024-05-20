import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogComment from "./BlogComment";
import Rate from "./Rate";

function Detail() {
  const params = useParams();
  const [data, setData] = useState("");
  const [comment, setComment] = useState([]);
  const [idRely, setIdRely] = useState("");
  const [reload, setReload] = useState(false);
  // const [rate, setRate] = useState([]);
  // const [star,setStar] = useState(0)
  const loadComment = ()=>{
    axios
      .get("http://127.0.0.1:8000/api/blog/detail/" + params.id)
      .then((res) => {
        setData(res.data.data);
        setComment(res?.data?.data?.comment);
      });
  }
  useEffect(() => {
    loadComment()
  }, []);

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8000/api/blog/rate/${params.id}`).then((res) => {
  //     setRate(res.data.data);
  //   });
  // }, []);
  // useEffect(()=>{
  //   if (rate.length > 0) {
  //     let tong = rate.reduce((acc, item) => acc + item.rate, 0);
  //     let trungbinhtong = tong / rate.length;
  //     setStar(trungbinhtong);
  //   }
  // },[rate])
  // console.log(star)
  // useEffect(() => {
  //   if (rate.length > 0) {
  //     let tong = rate.reduce((acc, item) => acc + item.rate, 0);
  //     let trungbinhtong = tong / rate.length;
  //     setStar(trungbinhtong);
  //   }
  // }, [rate]);
  // console.log(data)

  // console.log(data);
  function fetchData() {
    return (
      <>
        <div className="single-blog-post">
          <h3>{data?.title}</h3>
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
            {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
          </div>
          <a href="">
            <img
              src={"http://localhost:8000/upload/blog/image/" + data?.image}
              alt=""
            />
          </a>
          <p>{data?.content}</p>{" "}
          <div className="pager-area">
            <ul className="pager pull-right">
              <li>
                <a href="#">Pre</a>
              </li>
              <li>
                <a href="#">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {fetchData()}
      </div>
      {/*/blog-post-area*/}
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <Rate idBlog={params.id}  />
          <li className="color">(6 votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color" href="">
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href="">
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href="">
              Girls
            </a>
          </li>
        </ul>
      </div>
      {/*/rating-area*/}
      <div className="socials-share">
        <a href="">
          <img src="/frontend/images/blog/socials.png" alt="" />
        </a>
      </div>
      {/*/socials-share*/}
      {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}
      {/*Comments*/}
      <BlogComment
        comments={comment}
        setComment={setComment}
        id={data?.id}
        commentPosted={loadComment}
      />
    </div>
  );
}

export default Detail;
