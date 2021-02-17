import React, { Component } from 'react';
import Order from './Order'
import axios from '../../axios/axiosBurger'
import Spinner from '../Checkout/Spinner/Spinner'
import { connect } from "react-redux";
import * as OrderActions from '../../../store/actions/ActionsIndex'



class Orders extends Component {

  

   
    componentDidMount() {
        //  this.setState({loading:true})

        /*  axios.get("/orders.json")
         .then(res => {
             const fetchedOrders = [];
             for(let key in res.data){
                 fetchedOrders.push({
                     ...res.data[key],
                     id: key
                 });
             }
             this.setState({orders: fetchedOrders, loading: false})
            
         }); */
        this.props.startOrdersFetch(this.props.token,this.props.userId);
    }

    render() {
        /* console.log("orders: ",
        Object.keys (this.props.orders).length) */
        let content = (
            <div className="orders-list">
                {
                    this.props.orders.map(order => {
                        // console.log(order)
                        return <Order key={order.id} ingredients={order.ingredients} cost={order.cost}></Order>
                    })
                }
            </div>
        )
        if(Object.keys(this.props.orders).length==0){
            content = <p>No orders yet..Start ordering now!</p>
        }
        if (this.props.loading) {
            content = <Spinner />
        }
        

        return (

            <div className="orders-container">
               
                <h3>Your previous Orders!</h3>
                {this.props.error?<p className="error">{this.props.error}</p>:null}
                {content}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        loading: state.orderReducer.loading,
        orders: state.orderReducer.orders,
        token: state.auth.token,
        userId: state.auth.userID,
        error: state.orderReducer.error
    }
}

const mapDispacthtoProps = dispacth => {
    return {
        startOrdersFetch: (token,userID) => dispacth(OrderActions.fetchOrders(token,userID))
    }
}

export default connect(mapStatetoProps, mapDispacthtoProps)(Orders);