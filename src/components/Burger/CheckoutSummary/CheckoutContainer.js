import React, { Component } from 'react';


import Checkout from "../CheckoutSummary/CheckoutSummary"


class CheckoutContainer extends Component {

    /* state = {
        ingredients: {
           
        },
        
        Totalcost: 0
    }
 */
    /* componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const passed_ingredients = {};

        for (let param of query.entries()) {
            // ['salad','1']
            if (param[0] == "cost") {
               // console.log("cost: " + param[1]);
                this.setState({ Totalcost: +param[1] })


            }
            else
                passed_ingredients[param[0]] = +param[1];
            //console.log(param[0],param[1]);
        }

        this.setState({ ingredients: passed_ingredients });

    } */

    cancelCheckout = () => {

        this.props.history.goBack();

    }

    


    render() {

        let content = (<Checkout  cancel={this.cancelCheckout}  />);
        
        return (
            <div>
                {content}

            </div>
        );
    }
}




export default CheckoutContainer;