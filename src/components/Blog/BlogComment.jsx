import axios from "axios";
import React, { useRef, useState } from "react";
import { getLocalStorage } from "../../utils/store";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Error from "../Error";
import BlogListComment from "./BlogListComment";
export default function BlogComment({
  comments,
  setComment,
  id,
  commentPosted,
}) {
  const token = getLocalStorage("token") || "";
  const auth = getLocalStorage("auth");
  const navigate = useNavigate();
  // console.log(userData)
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState();
  const params = useParams();
  const [error, setError] = useState({});
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    const errorSubmit = {};
    console.log(token);
    if (token == "") {
      toast.error("bạn vui long đăng nhập ");
    } else {
      if (content === "") {
        errorSubmit.content = "vui lòng nhập bình luận";
        setError(errorSubmit);
      } else {
        // const data = {
        //   id_blog: params.id,
        //   id_user: auth.id,
        //   id_comment: parentId || 0,
        //   comment: content,
        //   image_user: auth.avatar,
        //   name_user: auth.name,
        // };
        const formData = new FormData();
        formData.append("id_blog", params.id);
        formData.append("id_user", auth.id);
        formData.append("id_comment", parentId || 0);
        formData.append("comment", content);
        formData.append("image_user", auth.avatar);
        formData.append("name_user", auth.name);

        const options = {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        };

        axios
          .post(
            `http://127.0.0.1:8000/api/blog/comment/${id}`,
            formData,
            options
          )
          .then((res) => {
            if (res.data.errors) {
              setError(res.data.errors);
            } else {
              console.log("RESPONSE ==== : ", res.data.data);
              setParentId("");
              setContent("");
              commentPosted();
            }
            // setComment([...comments, res.data.data]);
          })
          .catch((err) => {
            console.log("ERROR: ====", err);
          });
      }
    }
  };
  // console.log(comments)
  // console.log(parentId)
  return (
    <>
      <div className="response-area">
        <h2>3 RESPONSES</h2>
        <ul className="media-list">
          <BlogListComment listcomment={comments} setParentId={setParentId} />
        </ul>
      </div>
      {/*/Response-area*/}
      {/*/Repaly Box*/}
      <Error error={error}/>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label style={{ marginRight: "20px" }}>
                  {auth?.name || "Your Name"}
                </label>
              </div>
              <span>*</span>
              <Error error={error} />
              <textarea
                onChange={handleChange}
                name="message"
                rows={11}
                value={content}
                id="comment-input"
              />
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                id="btn-submit"
              >
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
