import {
  PAYMENT_TOTAL_SUCCESS,
  PAYMENT_TOTAL_FAIL,
  LOAD_BT_TOKEN_SUCCESS,
  LOAD_BT_TOKEN_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  RESET_PAYMENT_INFO,
  SET_PAYMENT_LOADING,
  REMOVE_PAYMENT_LOADING
} from "./types";
import { setAlert } from "./alert"
import { get_items_total } from "./cart";
import axios from "axios";

export const payment_total = (shipping_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/payment/payment_total?shipping_id=${shipping_id}`,
      config
    );
    res.status === 200 && !res.data.error
      ? dispatch({
          type: PAYMENT_TOTAL_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: PAYMENT_TOTAL_FAIL,
        });
  } catch (error) {
    dispatch({
      type: PAYMENT_TOTAL_FAIL,
    });
  }
};

export const get_token = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/payment/token`,
      config
    );
    res.status === 200 && !res.data.error
      ? dispatch({
          type: LOAD_BT_TOKEN_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: LOAD_BT_TOKEN_FAIL,
        });
  } catch (error) {
    dispatch({
      type: LOAD_BT_TOKEN_FAIL,
    });
  }
};

export const payment = (
    nonce, shipping_id, full_name, address_line_1,
    address_line_2, city, province, zip_code,
    country, telephone
  ) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      'Content-type': "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({
    nonce,
    shipping_id,
    full_name,
    address_line_1,
    address_line_2,
    city,
    province,
    zip_code,
    country,
    telephone
  })
  dispatch({ type: SET_PAYMENT_LOADING })
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/payment/payment`, body, config
    );
    if(res.status === 201 && !res.data.success){
      dispatch({ type: PAYMENT_SUCCESS, })
      dispatch(setAlert(res.data.success, 'green'));
      dispatch(get_items_total())
    } else {
      dispatch({ type: PAYMENT_FAIL });
      dispatch(setAlert(res.data.success, 'red'));
    }
  } catch (error) {
    dispatch({ type: PAYMENT_FAIL });
    dispatch(setAlert('Error processing payment', 'red'));
  }
  dispatch({ type: REMOVE_PAYMENT_LOADING });
};

export const reset_payment_info = () => async (dispatch) => {
    dispatch({ type: RESET_PAYMENT_INFO })
}