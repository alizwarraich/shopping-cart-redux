import React from "react";
import Header from "./Header";
import Products from "./Products";
import CartItems from "./CartItems";
import "./Layout.css";
import { useSelector } from "react-redux";

const Layout = () => {
  const list = useSelector((state) => state.cart.itemsList);
  const showCart = useSelector((state) => state.cart.showCart);
  let total = 0;
  list.forEach((item) => {
    total += item.totalPrice;
  })

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {list.length && showCart && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
