import { Link } from "react-router-dom";

export default function MenuAcc() {
  return (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">
          {/*category-productsr*/}
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="/account">account</Link>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="my-product">My product</Link>
              </h4>
            </div>
          </div>
        </div>
        {/*/category-products*/}
      </div>
    </div>
  );
}
