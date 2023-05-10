import axios from "axios";
import {
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
} from "./types";

export const get_orders = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log(config);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/orders`,
        config
      );
      console.log(res);
      res.status === 200
        ? dispatch({
            type: ORDERS_SUCCESS,
            payload: res.data,
          })
        : dispatch({ type: ORDERS_FAIL });
    } catch (error) {
      dispatch({ type: ORDERS_FAIL });
    }
  }
};

export const get_order_detail = transactionId => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      console.log(config);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/order/${transactionId}`, config );
        console.log(res);
        res.status === 200
          ? dispatch({
              type: ORDER_DETAIL_SUCCESS,
              payload: res.data,
            })
          : dispatch({ type: ORDER_DETAIL_FAIL });
      } catch (error) {
        dispatch({ type: ORDER_DETAIL_FAIL });
      }
    }
  };
  