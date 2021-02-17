import React, { Component } from 'react';
import BurgerControl from './BurgerControl';
import '../../../styles/OrderButton.css'

const BurgerControls = (props) => {

    const controls = [
        { label: "Salad", type: "salad" },
        { label: "Chicken Salami", type: "chicken" },
        { label: "Cheese", type: "cheese" },
        { label: "Patty", type: "meat" },
    ];

   
    return (
        <div className="Controls">
             <p className="total">Current Price: <strong>INR {props.totalPrice.toFixed(2)}</strong></p>
            {
                controls.map(control => {
                    return (
                        <BurgerControl
                            key={control.label}
                            label={control.label}
                            added={() => props.addIngredient(control.type)}
                            removed={() => props.removeIngredient(control.type)}
                            isLessDisabled={props.isLessDisabled[control.type]}
                            isMoreDisabled={props.isMoreDisabled[control.type]}
                        ></BurgerControl>
                    )
                })
            }
            <button disabled={!props.purchasable} className="OrderButton" onClick={props.purchasing}>{props.isAuthenticated?"Order Now":"Sign in to place your Order"}</button>
           
        </div>
    );

}

export default BurgerControls;