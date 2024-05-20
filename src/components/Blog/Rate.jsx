import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Rate({ idBlog }) {
  const [rating, setRating] = useState(0);
  const [data, setData] = useState([]);
  // console.log(rating)
  const token = localStorage.getItem("token") || "";
  const auth = JSON.parse(localStorage.getItem("auth"));
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/blog/rate/${idBlog}`)
        .then(res =>{
          const rate = Object.keys(res.data.data).map(k =>res.data.data[k])
          if (rate.length > 0) {
            let tong = rate.reduce((acc, item) => acc + item.rate, 0);
            let trungbinhtong = tong / rate.length;
            setRating(trungbinhtong);
            console.log(trungbinhtong)
          }
        })
  },[])
  
  function changeRating(newRating, name) {
    // console.log(name);
    // - xu ly logic
    // - xu ly api
    if (token === "") {
      toast.error("vui lòng đăng nhâp");
    } else {
      setRating(newRating);
      const data = {
        user_id: auth.id,
        blog_id: idBlog,
        rate: newRating,
      };
      const options = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      axios
        .post(`http://127.0.0.1:8000/api/blog/rate/${idBlog}`, data, options)
        .then((res) => {
          
          console.log(res);
        });
    }
  }

  return (
    <>
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
      />
    </>
  );
}
