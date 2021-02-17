import React, { Component } from 'react';
import { connect } from 'react-redux'


import Auxiliary from '../../Hoc/Auxiliary';
import BModel from './BurgerModel'
import BurgerControls from './Burger Controls/BurgerControls';
import Modal from './Checkout/Modal';
import OrderSummary from './Checkout/OrderSummary'
import Backdrop from './Checkout/Backdrop'
import Spinner from './Checkout/Spinner/Spinner'
import axios from '../axios/axiosBurger'
import * as BurgerBuilderActions from '../../store/actions/ActionsIndex'



class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        //  totalPrice: 30,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        /* axios.get('/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => console.log(error)) */
        this.setState({ loading: true })
        this.props.ingredientsInitialized();
      

    }

    addIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];



        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(updatedIngredients);

    }

    removeIngredients = (type) => {
        //console.log("less")
        const oldCount = this.state.ingredients[type];
        if (oldCount == 0)
            return null;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];


        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchasable(updatedIngredients);
    }

    updatePurchasable = (ingredients) => {

        //  const ingredients = {...this.state.ingredients};
        let sum = 0;
        //console.log(ingredients);
        (Object.keys(ingredients)).map(key => {
            sum = sum + ingredients[key];
        })
        //console.log("Total Ingredients", sum);
        //this.setState({ purchasable: sum > 0 });

        return sum > 0;

    }

    updatePurchasing = () => {

        if (this.props.isAuthenticated) {
            this.setState({ purchasing: !this.state.purchasing });
        }
        else this.props.history.push("/auth")
        //   console.log("order clicked");
    }

    sendOrder = () => {
        //this.setState({ loading: true })


        // console.log("time:",(new Date));

        /* const order = {
            ingredients: this.state.ingredients,
            cost: this.state.totalPrice,
            customer: {
                name: 'Nehal Bhandari',
                address: {
                    state: 'Bangalore',
                    zipcode: '560076'
                },
                email: 'test@test.com'
            },
            timestamp: (new Date)
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.updatePurchasing();
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
                this.updatePurchasing();
            }); */

        //not need cause of redux :)
        /*  const queryParams = [];
         for (let i in this.state.ingredients){
             queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
         }
         queryParams.push(encodeURIComponent('cost')+'='+encodeURIComponent(this.props.pri));

         const querString = queryParams.join("&");
         this.props.history.push({
             pathname: '/checkout',
             search: '?' + querString

         }); */
        this.props.updatePurchased();
        this.props.history.push('/checkout');
    }


    render() {

        // console.log("here",this.props.ings);

        //less button disable logic
        const disabledInfoLessButton = { ...this.props.ings };
        for (let key in disabledInfoLessButton) {
            disabledInfoLessButton[key] = disabledInfoLessButton[key] <= 0 ;
        }

        //less button disable logic
        const disabledInfoMoreButton = { ...this.props.ings };
        for (let key in disabledInfoMoreButton) {
            disabledInfoMoreButton[key] = disabledInfoMoreButton[key] >= 4 ;
        }


        let orderSummary = <OrderSummary sendOrder={this.sendOrder} cost={this.props.pri} updatePurchasing={this.updatePurchasing} ingredients={this.props.ings} />;
        /*   if (this.state.loading) {
            
              orderSummary = <Spinner />;
          } */
        // return <div></div>
        let burger = <Spinner />
        /*    console.log("Count",Object.keys(this.props.ings).length)
           console.log(this.props.ings) */

        if (Object.keys(this.props.ings).length != 0) {
            burger = <Auxiliary><BModel ingredients={this.props.ings} />

                <BurgerControls
                    addIngredient={this.props.addNewIngredient}
                    removeIngredient={this.props.removeOldIngredient}
                    isLessDisabled={disabledInfoLessButton}
                    isMoreDisabled={disabledInfoMoreButton}
                    totalPrice={this.props.pri}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    purchasing={this.updatePurchasing}
                    isAuthenticated={this.props.isAuthenticated}
                /></Auxiliary>
        }


        return (
            <Auxiliary>
                {//console.log("rendering...")
                    //console.clear()
                }
                <Backdrop purchasing={this.state.purchasing} updatePurchasing={this.updatePurchasing} />
                <Modal purchasing={this.state.purchasing}>
                    {orderSummary}
                </Modal>

                {burger}




            </Auxiliary>
        );
    }
}


const mapStatetoProps = state => {
    //console.log("here",state.ingredients)
    return {
        ings: state.burgerBuilderReducer.ingredients,
        pri: state.burgerBuilderReducer.totalPrice,
        isAuthenticated: state.auth.token
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        addNewIngredient: (ingName) => dispatch(BurgerBuilderActions.addingredients(ingName)),
        removeOldIngredient: (ingName) => dispatch(BurgerBuilderActions.removeingredients(ingName)),
        ingredientsInitialized: () => dispatch(BurgerBuilderActions.initIngredients()),
        updatePurchased: () => dispatch(BurgerBuilderActions.updatepurchasesatus())
    };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(BurgerBuilder);