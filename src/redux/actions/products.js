import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
  GET_PRODUCTS_BY_SOLD_SUCCESS,
  GET_PRODUCTS_BY_SOLD_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  RELATED_PRODUCTS_SUCCESS,
  RELATED_PRODUCTS_FAIL,
  FILTERED_PRODUCTS_SUCCESS,
  FILTERED_PRODUCTS_FAIL,
} from "./types";
import axios from "axios";

export const get_products = () => async (dispatch) => {
  const config = {
    headers: {
      "Accept": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/list`,
      config
    );
    
    res.status === 200
      ? dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: GET_PRODUCTS_FAIL,
        });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
    });
  }
};

export const get_products_by_arrival = () => async (dispatch) => {
  const config = {
    headers: {
      "Accept": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/list?sortBy=date_created&order=desc&limit=3`,
      config
    );
    
    res.status === 200
      ? dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
        });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
    });
  }
};

export const get_products_by_sold = () => async (dispatch) => {
  const config = {
    headers: {
      "Accept": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/list?sortBy=sold`,
      config
    );
    
    res.status === 200
      ? dispatch({
          type: GET_PRODUCTS_BY_SOLD_SUCCESS,
          payload: res.data,
        })
      : dispatch({
          type: GET_PRODUCTS_BY_SOLD_FAIL,
        });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_SOLD_FAIL,
    });
  }
};

export const get_product = (productID) => async (dispatch) => {
  const config = {
    headers: {
      "Accept": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/detail/${productID}`,
      config
    );
    (res.status === 200)?(
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: res.data,
      })
    ):( 
      dispatch({
        type: GET_PRODUCT_FAIL,
      })
    )
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
    });
  }
};

export const get_related_product = (productID) => async (dispatch) => {
  const config = {
    headers: {
      "Accept": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/related_products/${productID}`,
      config
    );
    (res.status === 200 && !res.data.error)?(
      dispatch({
          type: RELATED_PRODUCTS_SUCCESS,
          payload: res.data,
        })
      ):(
          dispatch({
            type: RELATED_PRODUCTS_FAIL,
          })
      )
  } catch (error) {
    dispatch({
      type: RELATED_PRODUCTS_FAIL,
    });
  }
};

export const get_product_by_search =
  (category_id, search) => async (dispatch) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      category_id: category_id,
      search: search,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/search`,
        body,
        config
      );
      
      res.status === 200
        ? dispatch({
            type: SEARCH_PRODUCT_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: SEARCH_PRODUCT_FAIL,
          });
    } catch (error) {
      dispatch({
        type: SEARCH_PRODUCT_FAIL,
      });
    }
  };

export const get_filtered_products =
  (category_id, sortBy, price_range, order) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      category_id: category_id,
      sortBy: sortBy,
      price_range: price_range,
      order: order,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/search/filtered`,
        body,
        config
      );
      res.status === 200
        ? dispatch({
            type: FILTERED_PRODUCTS_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: FILTERED_PRODUCTS_FAIL,
          });
    } catch (error) {
      dispatch({
        type: FILTERED_PRODUCTS_FAIL,
      });
    }
  };
