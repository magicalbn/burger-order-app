import React, { Component } from 'react';
import classes from "../../styles/BurgerIngredient.css";

class BurgerIngredients extends Component {
    state = {}
    render() {
        let ingredient = null;
        //console.log("type",this.props.type)

        switch (this.props.type) {
            case ('bread-top'):
                ingredient = (
                    <div className="BreadTop">
                        <div className="Seeds1"></div>
                        <div className="Seeds2"></div>
                    </div>
                )
                break;
            case ('bread-bottom'):
                ingredient = <div className="BreadBottom"></div>
                break;
            case ('meat'):
                ingredient = <div className="Meat"></div>
                break;
            case ('cheese'):
                ingredient = <div className="Cheese"></div>
                break;
            case ('chicken'):
                ingredient = <div className="Chicken"></div>
                break;
            case ('salad'):
                ingredient = <div className="Salad"></div>
                break;
            default:
                ingredient = null;
                break;
        }

        return ingredient;
    }
}

export default BurgerIngredients;