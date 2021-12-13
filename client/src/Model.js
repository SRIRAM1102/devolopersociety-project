import { useState } from "react";
import { Component } from "./Component";

export function Model({ setshow, removecart }) {
  let total, amount, mapper, name;
  const [order, setorder] = useState(false);

  if (!order) {
    mapper = JSON.parse(localStorage.getItem("carthistory"));
    name = "buyhistory";

    if (mapper.length != 0) {
      amount = JSON.parse(localStorage.getItem("carthistory")).map(
        (user) => user.amount
      );
      total = amount.reduce((accumlator, current) => +accumlator + +current);
    }
  } else {
    mapper = JSON.parse(localStorage.getItem("buyhistory"));
    name = "carthistory";

    if (mapper.length != 0) {
      amount = JSON.parse(localStorage.getItem("buyhistory")).map(
        (user) => user.amount
      );
      total = amount.reduce((accumlator, current) => +accumlator + +current);
    }
  }

  function buyFromCart() {
    fetch("https://ecommerce-sriram.herokuapp.com/buycartitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        data: JSON.parse(localStorage.getItem("carthistory")),
      }),
    })
      .then((response) => response.json())
      .then((data) => buydata(data));

    function buydata(data) {
      localStorage.setItem("buyhistory", JSON.stringify(data.buyitem));
      localStorage.setItem("carthistory", JSON.stringify(data.cartitem));
    }
  }
  return (
    <div className="modal">
      <div className="modalarea" onClick={() => setshow(false)}>
        <div className="modalheaders">
         <button onClick={() => setshow(false)} className="crossmark">
            ✖
          </button>
        </div>
        <div
          className="modalcontent"
          onClick={(event) => event.stopPropagation()}
        >
          <button onClick={() => setorder(!order)}>{name}</button>
          { mapper.map((user) => (
              <Component user={user} removecart={removecart} name={name}/>
            ))}
          <p>
            <span>Total:</span>${total}
          </p>
          {!order &&
            JSON.parse(localStorage.getItem("carthistory")).length != 0 && (
              <button onClick={() => buyFromCart()}>buynow</button>
            )}
        </div>
      </div>
    </div>
  );
}
