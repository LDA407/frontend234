import {
  GET_ITEMS,
  ADD_ITEM,
  GET_TOTAL,
  GET_TOTAL_ITEMS,
  UPDATE_ITEM,
  REMOVE_ITEM,
  EMPTY_CART,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_TOTAL_SUCCESS,
  GET_TOTAL_FAIL,
  GET_TOTAL_ITEMS_SUCCESS,
  GET_TOTAL_ITEMS_FAIL,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  SYNCH_CART_SUCCESS,
  SYNCH_CART_FAIL,
} from "./types";
import axios from "axios";


export const add_item = (product) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    const product_id = product.id;
    const body = JSON.stringify({ product_id });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/shopping_cart/add_item`, body, config );

      if (res.status === 201) {
        console.log(res.data);
        dispatch({
          type: ADD_ITEM_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: ADD_ITEM_FAIL });
      }
    } catch (error) {
      dispatch({ type: ADD_ITEM_FAIL });
    }
  } else {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemExists = cart.find((item) => item.product.id.toString() === product.id.toString());

    if (!itemExists) {
      const order_item = {
        product: product,
        count: 1,
      };
      cart.push(order_item);
    }

    dispatch({
      type: ADD_ITEM,
      payload: cart,
    });
  }
};



export const get_items = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/shopping_cart/get_items`,
        config
      );
      console.log(res.data);
      (res.status === 200)?(
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data.results[0].items,
        })
      ):(
        dispatch({ type: GET_ITEMS_FAIL, })
      )
    } catch (error) { dispatch({ type: GET_ITEMS_FAIL, }); }
  } else { dispatch({ type: GET_ITEMS, }); }
};


export const get_total = () => async (dispatch) => {
  const access = localStorage.getItem("access");
  if (access) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/shopping_cart/get_total`,
        config
      );
      console.log(res.data);
      res.status === 200
        ? dispatch({
            type: GET_TOTAL_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: GET_TOTAL_FAIL,
          });
    } catch (error) {
      dispatch({
        type: GET_TOTAL_FAIL,
      });
    }
  } else {
    let total = 0.0;
    let comparar_total = 0.0;
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((item) => {
        total += parseFloat(item.product.price) * parseFloat(item.count);
        comparar_total +=
          parseFloat(item.product.price_with_discount) * parseFloat(item.count);
      });
    }
    dispatch({
      type: GET_TOTAL,
      payload: [
        parseFloat(total.toFixed(2)),
        parseFloat(comparar_total.toFixed(2)),
      ],
    });
  }
};


export const get_items_total = () => async (dispatch) => {
  const access = localStorage.getItem("access");
  if (access) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/shopping_cart/get_items_total`,
        config
      );
      console.log(res.data);
      res.status === 200
        ? dispatch({
            type: GET_TOTAL_ITEMS_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: GET_TOTAL_ITEMS_FAIL,
          });
    } catch (error) {
      dispatch({
        type: GET_TOTAL_ITEMS_FAIL,
      });
    }
  } else {
    let total = 0;
    if (localStorage.getItem("cart")) {
      total = JSON.parse(localStorage.getItem("cart")).length;
    }
    dispatch({
      type: GET_TOTAL_ITEMS,
      payload: total,
    });
  }
};


export const update_item = (item, count) => async (dispatch) => {
  const access = localStorage.getItem("access");
  if (access) {
    const product_id = item.product.id;
    const body = JSON.stringify({ product_id, count });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
      data: body,
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/shopping_cart/update_item`,
        config
      );
      console.log(res.data);
      res.status === 200 && !res.data.error
        ? dispatch({
            type: UPDATE_ITEM_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: UPDATE_ITEM_FAIL,
          });
    } catch (error) {
      dispatch({
        type: UPDATE_ITEM_FAIL,
      });
    }
  } else {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((cart_item, index) => {
        if (cart_item.product.id.toString() === item.product.id.toString()) {
          cart[index].count = parseFloat(count);
        }
      });
    }

    dispatch({
      type: UPDATE_ITEM,
      payload: cart,
    });
  }
};


export const remove_item = (item) => async (dispatch) => {
  const access = localStorage.getItem("access");
  if (access) {
    const product_id = item.product.id;
    const body = JSON.stringify({ product_id });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
      data: body,
    };

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/shopping_cart/remove_item`,
        config
      );
      console.log(res.data);
      res.status === 200
        ? dispatch({
            type: REMOVE_ITEM_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: REMOVE_ITEM_FAIL,
          });
    } catch (error) {
      dispatch({
        type: REMOVE_ITEM_FAIL,
      });
    }
  } else {
    let cart = [];
    let new_cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((cart_item) => {
        if (
          cart_item.product.id.toString() !== cart_item.product.id.toString()
        ) {
          new_cart.push(cart_item);
        }
      });
    }
    dispatch({
      type: REMOVE_ITEM,
      payload: new_cart,
    });
  }
};


export const empty_cart = () => async (dispatch) => {
  const access = localStorage.getItem("access");
  if (access) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/shopping_cart/empty_cart`,
        config
      );
      console.log(res.data);
      res.status === 200
        ? dispatch({
            type: EMPTY_CART_SUCCESS,
            payload: res.data,
          })
        : dispatch({
            type: EMPTY_CART_FAIL,
          });
    } catch (error) {
      dispatch({
        type: EMPTY_CART_FAIL,
      });
    }
  } else {
    dispatch({
      type: EMPTY_CART,
    });
  }
};


export const synch_cart = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  let cart_items = []
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((cart_item) => {
      const item = {
        'product_id': cart_item.product.id,
        'count': cart_item.count,
      }
      cart_items.push(item)
    });
  }
  const body = JSON.stringify({ cart_items })

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/shopping_cart/synch_cart`,
      body, 
      config
    );
    if(res.status === 201){
      console.log(res.data);
      dispatch({
        type: SYNCH_CART_SUCCESS,
        payload: res.data,
      })
    } else { dispatch({ type: SYNCH_CART_FAIL, }); }
  } catch (error) { dispatch({ type: SYNCH_CART_FAIL, }); }
};
