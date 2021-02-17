import * as actionTypes from '../actions/actionTypes'

const initalState = {
    orders: [],
    loading: false,
    isPurchased: false,
    error: null
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.START_ORDER: {
            return {
                ...state,
                loading: true,
                error: null
            }
        };
        case actionTypes.ORDER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isPurchased: true
            }
        };
        case actionTypes.ORDER_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case actionTypes.PURCHASE_STATUS: {
            return {
                ...state,
                isPurchased: false
            }
        };
        case actionTypes.ORDERS_FETCH_SUCCESS: {
            return {
                ...state,
                orders: action.fetchedorders,
                loading: false
            }
        };
        case actionTypes.START_ORDERS_FETCH: {
            return {
                ...state,
                orders: [],
                loading: true,
                error: null
            }
        };
        case actionTypes.ORDERS_FETCH_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        };
        default: {
            return state
        }
    }
}

export default reducer