import {GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL} from "./types";
import axios from "axios";

export const get_categories = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/categories`,
      config
    );
    res.status === 200
      ? dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: GET_CATEGORIES_FAIL,
        });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
    });
  }
};
