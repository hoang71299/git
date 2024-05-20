import moment from "moment";
export default function BlogListComment({ listcomment, setParentId }) {
  // console.log(listcomment);
  return (
    <>
      {listcomment.map(
        (item) =>
          item.id_comment === 0 && (
            <div key={item.id}>
              <li className="media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object w-100"
                    style={{ width: "120px", height: "100px" }}
                    src={`http://127.0.0.1:8000/upload/user/avatar/${item.image_user}`}
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {item.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" />{" "}
                      {moment(item.updated_at).format("LT")}
                    </li>
                    <li>
                      <i className="fa fa-calendar" />{" "}
                      {moment(item.updated_at).format('l')}
                    </li>
                  </ul>
                  <p>{item.comment}</p>
                  <a
                    href="#comment-input"
                    className="btn btn-primary"
                    onClick={() => {
                      setParentId(item.id);
                    }}
                  >
                    <i className="fa fa-reply" />
                    Replay
                  </a>
                </div>
              </li>
              {listcomment.map(
                (item2) =>
                  item2.id_comment === item.id && (
                    <li key={item2.id} className="media second-media">
                      <a className="pull-left" href="#">
                        <img
                          style={{ width: "120px", height: "100px" }}
                          className="media-object"
                          src={`http://127.0.0.1:8000/upload/user/avatar/${item2.image_user}`}
                          alt=""
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {item2.name_user}
                          </li>
                          <li>
                            <i className="fa fa-clock-o" />{" "}
                            {moment(item2.updated_at).format("LT")}
                          </li>
                          <li>
                            <i className="fa fa-calendar" />{" "}
                            {moment(item2.updated_at).format('l')}
                          </li>
                        </ul>
                        <p>{item2.comment}</p>
                        <a href="#comment-input" className="btn btn-primary">
                          <i className="fa fa-reply" />
                          Replay
                        </a>
                      </div>
                    </li>
                  )
              )}
            </div>
          )
      )}
    </>
  );
}
