import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import BurgerBuildreducer from './store/reducers/burgerBuild';
import Orderreducer from './store/reducers/ordersReducer';
import Authreducer from './store/reducers/authReducer';
import thunk from 'redux-thunk';

import App from "./components/App";

import "./styles/dist/styles.css";
import './styles/BurgerIngredient.css';


console.log(process.env.NODE_ENV+" build")
const composeEnhancers = process.env.NODE_ENV==="development" ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootReducer = combineReducers(
    {
        burgerBuilderReducer: BurgerBuildreducer,
        orderReducer: Orderreducer,
        auth: Authreducer
    }
);
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


ReactDom.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.querySelector("#root"));
