import React, {Component} from 'react';
import Auxiliary from '../../../Hoc/Auxiliary'


class OrderSumary extends Component {
    
    //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
    componentDidUpdate() {
       /*  console.log("Order Summary Rendered");
        let sum=0;
        let transformIngredients = Object.keys(this.props.ingredients).map(each => {
            sum=sum+this.props.ingredients[each]
        });
        console.log("Ingredients count: " + sum); */
    }

    render() { 
        const ingredients = { ...this.props.ingredients };
        

        const IngredientsSummary = Object.keys(ingredients)
            .map(key => {
                return <li key={key}><span>{key}:</span> {ingredients[key]}</li>
            })
        
       
        return ( 
            <Auxiliary>
            <h3>Your Order Summary</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {IngredientsSummary}
            </ul>
            <h4>Total Price: { this.props.cost.toFixed(2) } <i className="fas fa-rupee-sign"></i></h4>
            <p>Continue to Checkout?</p>
            <div className="buttons">
                <button className="cancel" onClick={this.props.updatePurchasing}>Cancel</button>
                <button className="continue" onClick={this.props.sendOrder}>Continue</button>
            </div>
        </Auxiliary>
         );
    }
}
 
export default OrderSumary;



/*

const OrderSumary = (props) => {
    const ingredients = { ...props.ingredients };

    const IngredientsSummary = Object.keys(ingredients)
        .map(key => {
            return <li key={key}><span>{key}:</span> {ingredients[key]}</li>
        })

    return (
        <Auxiliary>
            <h3>Your Order Summary</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {IngredientsSummary}
            </ul>
            <h4>Total Price: { props.cost.toFixed(2) } <i className="fas fa-rupee-sign"></i></h4>
            <p>Continue to Checkout?</p>
            <div className="buttons">
                <button className="cancel" onClick={props.updatePurchasing}>Cancel</button>
                <button className="continue" onClick={() => alert("Success")}>Continue</button>
            </div>
        </Auxiliary>
    )


}

export default OrderSumary;*/