import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending request',
        type: 'warning',
      }))
      const res = await fetch('https://redux-shopping-cart-97086-default-rtdb.firebaseio.com/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Request sent successfully',
        type: 'success',
      }))
    }
    sendRequest()
      .catch(err => {
        dispatch(uiActions.showNotification({
          open: true,
          message: `Sending request failed due to error ${err}`,
          type: 'error',
        }))
      });
  }, [cart])
  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
