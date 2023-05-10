import {
  PAYMENT_TOTAL_SUCCESS,
  PAYMENT_TOTAL_FAIL,
  LOAD_BT_TOKEN_SUCCESS,
  LOAD_BT_TOKEN_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  RESET_PAYMENT_INFO,
  SET_PAYMENT_LOADING,
  REMOVE_PAYMENT_LOADING,
} from "../actions/types";

const initialState = {
  clientToken: null,
  made_payment: false,
  original_price: 0.0,
  total_amount: 0.0,
  total_compare_amount: 0.0,
  estimated_tax: 0.0,
  shipping_cost: 0.0,
  loading: false
}

export default function Payment(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAYMENT_TOTAL_SUCCESS:
      return {
        ...state,
        original_price: payload.original_price,
        total_amount: payload.total_amount,
        total_compare_amount: payload.total_compare_amount,
        estimated_tax: payload.estimated_tax,
        shipping_cost: payload.shipping_cost,
      }
    case PAYMENT_TOTAL_FAIL:
      return {
        ...state,
        original_price: 0.0,
        total_amount: 0.0,
        total_compare_amount: 0.0,
        estimated_tax: 0.0,
        shipping_cost: 0.0,
      }
    case LOAD_BT_TOKEN_SUCCESS:
      return {
        ...state,
        clientToken: payload.braintree_token
      }
    case LOAD_BT_TOKEN_FAIL:
      return {
        ...state,
        clientToken: null
      }
    case PAYMENT_SUCCESS:
      return {
        ...state,
        made_payment: true
      }
    case PAYMENT_FAIL:
      return {
        ...state,
        made_payment: false
      }
    case SET_PAYMENT_LOADING:
      return {
        ...state,
        loading: true
      }
    case REMOVE_PAYMENT_LOADING:
      return {
        ...state,
        loading: false
      }
    case RESET_PAYMENT_INFO:
        return {
          ...state,
          clientToken: null,
          made_payment: false
        }
    default:
      return state;
  }
}



function setAuthLoading(state, action) {
  return {
    ...state,
    loading: true,
  };
}

function removeAuthLoading(state, action) {
  return {
    ...state,
    loading: false,
  };
}

function userLoadedSuccess(state, action) {
  return {
    ...state,
    user: action.payload,
  };
}
// ... etc
