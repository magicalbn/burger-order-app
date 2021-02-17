import React, { Component } from 'react';
import Backdrop from './Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
     //  console.log(nextProps.purchasing !== this.props.purchasing);
        return  nextProps.purchasing !== this.props.purchasing;// || nextProps.children !== this.props.children;
    }
    render() {
        const classname = this.props.purchasing ? "Modal showSummary" : "Modal hideSummary";
        return (
            <div className={classname}>

                {this.props.children}
            </div>
        );
    }
}

export default Modal;

/*
const Modal = (props) =>{

    const classname = props.purchasing?"Modal showSummary":"Modal hideSummary";
    return(
        <div className={classname}>

            {props.children}
        </div>
    )
}

export default Modal;*/