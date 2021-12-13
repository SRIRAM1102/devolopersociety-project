import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Header } from "./Header";
import { Model } from "./Model";
import { Navbar } from "./Navbar";
import { Tabs } from "./Tabs";
import { Route, Switch } from "react-router-dom";
import { Login } from "./login";
import { Signup } from "./signup";
import { Product } from "./product";
import { useHistory } from "react-router";
function App() {
  const [details, setdetails] = useState([]);
  const [show, setshow] = useState(false);
  let [entry, setentry] = useState([]);
  const [count, setcount] = useState(1);
  const history = useHistory();

  function addtocart(id, count) {
    if (!localStorage.getItem("token")) history.push("/login");
    setcount(1);
    const [product] = details.filter((user) => user._id == id);

    fetch("https://ecommerce-sriram.herokuapp.com/cartitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        productname: product.productname,
        count: count,
        amount: product.pricing * count,
      }),
    })
      .then((response) => response.json())
      .then((data) => cartdata(data));

    function cartdata(data) {
      localStorage.setItem("carthistory", JSON.stringify(data));
    }       
    alert(`Product has been added to Cart`);
  }

  function buynow(id, count) {
    if (!localStorage.getItem("token")) history.push("/login");
    const [product] = details.filter((user) => user._id == id);

    fetch("https://ecommerce-sriram.herokuapp.com/buyitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        productname: product.productname,
        count: count,
        amount: product.pricing * count,
      }),
    })
      .then((response) => response.json())
      .then((data) => buydata(data));

    function buydata(data) {
      localStorage.setItem("buyhistory", JSON.stringify(data));
      window.location.reload();
    }
    alert(`Your order has sussfully placed`);
  }

  function removecart(productname) {
    fetch("https://ecommerce-sriram.herokuapp.com/removecart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        data: productname,
      }),
    })
      .then((response) => response.json())
      .then((data) => cartdata(data));

    function cartdata(data) {
      localStorage.setItem("carthistory", JSON.stringify(data));
      window.location.reload();
    }
    alert(`Product has been removed from CartItem`);
  }
  function showdata() {
    if (!localStorage.getItem("token")) history.push("/login");
    else setshow(!show);
  }

  function getData() {
    fetch("https://ecommerce-sriram.herokuapp.com/productdata")
      .then((data) => data.json())
      .then((user) => setdetails(user));
  }
  useEffect(() => {
    getData();
  }, []);

  function productpage(productname) {
    localStorage.setItem(
      "productdata",
      JSON.stringify(details.filter((user) => user.productname == productname))
    );
  }
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/productpage/:prd">
          <Navbar showdata={showdata} />
          {show ? <Model setshow={setshow} removecart={removecart} /> : " "}
          <Product
            addtocart={addtocart}
            count={count}
            setcount={setcount}
            buynow={buynow}
          />
        </Route>

        <Route path="/*">
          <Navbar showdata={showdata} entry={entry} />
          <Header />
          <div className="container">
            {details.map((user) => (
              <Tabs
                addtocart={addtocart}
                productpage={productpage}
                user={user} 
              />
            ))}
          </div>
          {show ? <Model setshow={setshow} removecart={removecart} /> : " "}
        </Route>
      </Switch>
    </>
  );
}

export default App;
