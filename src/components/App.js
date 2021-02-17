import React, { Component } from "react";
import Layout from './Layout';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import BurgerBuilder from './Burger/BurgerBuilder'
import CheckoutContainer from './Burger/CheckoutSummary/CheckoutContainer'
import Orders from './Burger/Orders/OrdersContainer'
import Auth from './auth/AuthContainer'
import Logout from './auth/Logout'
import *  as actionTypes from '../store/actions/ActionsIndex'



class App extends Component {

    componentDidMount() {
        this.props.autoSignin();
    }


    render() {

        let route = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/auth" exact component={Auth} />
                <Redirect to='/'/>
            </Switch>
        )

        if (this.props.isAuthenticate) {
            route = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/checkout" component={CheckoutContainer} />
                    <Route path="/orders" component={Orders} />
                    <Redirect to='/'/>
                </Switch>
            )
        }
        return (
            <Layout>
                {route}

            </Layout>
        )
    }
}

const mapStatetoProps = state => {
    return {
        isAuthenticate: state.auth.token != null
    }
}

const mapDispatctoProps = dispatch => {
    return {
        autoSignin: () => dispatch(actionTypes.autoSignin())
    }
}

export default withRouter(connect(mapStatetoProps, mapDispatctoProps)(App));