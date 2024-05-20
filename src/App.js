import logo from "./logo.svg";
import "./App.css";
import Head from "./components/Layout/Head";
import MenuLeft from "./components/Layout/MenuLeft";
import Footer from "./components/Layout/Footer";
import Member from "./components/Member";
import { useLocation } from "react-router-dom";
import MenuAcc from "./components/Layout/MenuAcc";

function App(props) {
  let params1 = useLocation();
  // console.log(params1);
  return (
    <>
      <Head />
      <section>
        <div className="container">
          <div className="row">
            {params1["pathname"].includes("account") ||
            params1["pathname"].includes("my-product") ||
            params1["pathname"].includes("create-product")||
            params1["pathname"].includes("update-product")
            ? (
              <MenuAcc />
            ) : (
              <MenuLeft />
            )}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
