
import React, { Component } from 'react';

import BurgerIngredients from "./BurgerIngredients"
import { withRouter } from 'react-router-dom'




class BModel extends Component {
    //  console.log(this.props)

    // console.log("Ingredients", Object.keys(this.props.ingredients));

    shouldComponentUpdate(nextProps, nextState) {
        
       // console.log(nextProps.ingredients,this.props.ingredients)
        return nextProps.ingredients!=this.props.ingredients;
    }
    render() {
        let transformIngredients = Object.keys(this.props.ingredients).map(each => {
            // console.log(each,this.props.ingredients[each]);
            return [...Array(this.props.ingredients[each])].map((_, index) => {
                return <BurgerIngredients key={each + index} type={each}></BurgerIngredients>
            })
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        //console.log("Ingredients count: " + transformIngredients.length);

        if (transformIngredients.length == 0)
            transformIngredients = <p className="start">Start Adding Ingredients</p>







        return (
            <div className="Burger">
                <BurgerIngredients type="bread-top"></BurgerIngredients>

                {transformIngredients}

                <BurgerIngredients type="bread-bottom"></BurgerIngredients>
            </div>
        );
    }

}



export default withRouter(BModel);
