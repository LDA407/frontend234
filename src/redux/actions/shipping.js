import {SHIPPING_OPTIONS_SUCCESS, SHIPPING_OPTIONS_FAIL} from "./types";
import axios from "axios";

export const get_shipping = () => async (dispatch) => {
  const config = {
    headers: {
      "Accept": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shipping/shipping_options`,
      config
    );
    res.status === 200
      ? dispatch({
          type: SHIPPING_OPTIONS_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: SHIPPING_OPTIONS_FAIL,
        });
  } catch (error) {
    dispatch({
      type: SHIPPING_OPTIONS_FAIL,
    });
  }
};
