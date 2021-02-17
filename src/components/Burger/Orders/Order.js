import React from 'react';

const Order = (props) =>{

    let transformIngredients = Object.keys(props.ingredients).map(each =>{
       // return ""+each+": "+props.ingredients[each];
       return <span key={each}>{each} : {props.ingredients[each]} </span>
    })



   // transformIngredients = transformIngredients.join(", ")
    

    return(
        <div className="each-order">
            
            <p className="ingredients">Ingredients: {transformIngredients}</p>
            <p className="amount">Amount: <strong>INR {props.cost}</strong></p>
        </div>
    )
}

export default Order;