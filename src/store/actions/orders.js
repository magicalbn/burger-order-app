import * as actionTypes from './actionTypes';
import axios from '../../components/axios/axiosBurger'




const startOrder = () => {
    return {
        type: actionTypes.START_ORDER
    }
}

const orderSuccess = () => {
    alert("Order Placed! Hope You Enjoy Your Burger.")
    return {
        type: actionTypes.ORDER_SUCCESS
    }
}

const orderFailed = (error) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error: error
    }
}

export const updatepurchasesatus = () => {
    return {
        type: actionTypes.PURCHASE_STATUS
    }
}


export const placeOrder = (orderData,token,userID) => {

    return dispatch => {
        dispatch(startOrder());
        axios.post('/orders/'+userID+'.json?auth='+token, orderData)
            .then(response => {
              //  console.log("order submitted");
                dispatch(orderSuccess());

            })
            .catch(error => {
              //  console.log("placing order error ", error.response);
                dispatch(orderFailed(error.response.data.error));
            });
    }


}

//fetch orders actions
const startOrderfetch = () => {
    return {
        type: actionTypes.START_ORDERS_FETCH,
    }
}

const storeOrders = (orders) => {
    return {
        type: actionTypes.ORDERS_FETCH_SUCCESS,
        fetchedorders: orders
        
    }
}

const orderFetchFailed = (error) => {
    return {
        type: actionTypes.ORDERS_FETCH_FAILED,
        error: error
    }
}


export const fetchOrders = (token,userID) => {
    return dispatch => {
        dispatch(startOrderfetch())
        axios.get('/orders/'+userID+'.json?auth='+token)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
              //console.log("here",fetchedOrders);
                dispatch(storeOrders(fetchedOrders));

            })
            .catch(error => {
                console.log("fetch orders error: ", error.response)
                dispatch(orderFetchFailed(error.response.data.error))
                
            });
    }
}