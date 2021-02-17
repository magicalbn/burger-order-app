import React from 'react';

const Backdrop = (props) =>{
    return (props.purchasing?<div className="backdrop" onClick={props.updatePurchasing}></div>:null)
}

export default Backdrop;