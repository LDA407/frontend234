import {
    ORDERS_SUCCESS,
    ORDERS_FAIL,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL
} from "../actions/types"

const initialState = {
    orders: null,
    order: null
}

export default function Orders(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.orders
            }
        case ORDERS_FAIL:
            return {
                ...state,
                orders: null
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                order: payload.order
            }
        case ORDER_DETAIL_FAIL:
            return {
                ...state,
                order: null
            }
        default:
            return state;
    }
    
}