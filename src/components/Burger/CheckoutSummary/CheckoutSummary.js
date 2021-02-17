
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import Burger from '../BurgerModel'
import Input from '../../UI/Input'
import axios from '../../axios/axiosBurger'
import Spinner from '../Checkout/Spinner/Spinner'
import { connect } from 'react-redux';
import * as OrderActions from '../../../store/actions/ActionsIndex'


class CheckoutSummary extends Component {

/*     shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.isPurchased)
        return !nextProps.isPurchased;
    }
 */

   

    state = {

        isFormValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isTouched: false,
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail',
                },
                value: this.props.email?this.props.email:'',
                validation: {
                    required: true,
                    isEmail: true
                },
                isTouched: this.props.email?true:false,
                valid: this.props.email?true:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isTouched: false,
                valid: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    min: 3,
                    max: 7
                },
                isTouched: false,
                valid: false
            },
            deliverytype: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {
                    required: false,
                },
                isTouched: false,
                valid: true
            }
        }
    }


    changeHandler = (event, inputIdentifier) => {
        let ContactAllElements = { ...this.state.orderForm };
        let ContactEachElement = ContactAllElements[inputIdentifier];

        ContactEachElement.value = event.target.value;
        ContactEachElement.isTouched = true;


        let isValid = this.checkValidation(ContactEachElement.value, ContactEachElement.validation);
        ContactEachElement.valid = isValid;

        let formValidity = this.checkFormValidation(ContactAllElements);

        ContactAllElements[inputIdentifier] = ContactEachElement;
        this.setState({ orderForm: ContactAllElements, isFormValid: formValidity });


    }

    checkValidation = (value, validation) => {
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() != "";
        }
        if (validation.required && validation.min && isValid) {
            isValid = value.length > validation.min;
        }
        if (validation.required && validation.max && isValid) {
            isValid = value.length <= validation.max;
        }
        if (validation.required && validation.isEmail && isValid) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value);

        }

        return isValid

    }

    checkFormValidation(allElements) {
        for (let key in allElements) {
            // console.log(key, allElements[key].valid)
            if (!allElements[key].valid) {
              //  console.log(key, allElements[key].valid );
                return false;
            }
        }
        return true;
    }

    continueCheckout = () => {


        let CustomerData = {}

        for (let formElementIdentifier in this.state.orderForm) {
            CustomerData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
       // console.log(CustomerData);



        // console.log("time:",(new Date));

        const order = {
            ingredients: this.props.ings,
            cost: this.props.pri,
            customer: CustomerData,
            timestamp: (new Date)
        }

        this.props.sendOrder(order,this.props.token,this.props.userId);
        /* axios.post('/orders.json', order)
            .then(response => {  

            })
            .catch(error => {
                console.log(error);                

            });    */

        //this.props.history.replace('/');

    }


    render() {

          

        let FormElements = [];

        for (let key in this.state.orderForm) {
            FormElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let content = (
            <>
              
                <div className="contact-data">
                    <h2>Enter your contact details</h2>
                    <form  >
                    {this.props.error?<p className="error">{this.props.error}</p>:null}
                        {
                            FormElements.map(each => {
                                return <Input key={each.id} config={each.config} changed={(event) => this.changeHandler(event, each.id)} />
                            })

                        }

                    </form>
                    <div className="buttons">
                        <button className="cancel" onClick={this.props.cancel}>Cancel</button>
                        <button className="continue" disabled={!this.state.isFormValid} onClick={this.continueCheckout} >Order</button>
                    </div>
                </div>
            </>
        )

        let redirect =null;
        
        if (Object.keys(this.props.ings).length == 0 || this.props.isPurchased) {
            
                  
            redirect = <Redirect to='/' />;
        }

        

       

        if (this.props.loading) {
            content = <Spinner />
        }



        return (
            <div className="checkout-summary">

                {redirect}
                <h1>Hope you enjoy your burger!!</h1>
                
                <div className="burger">
                    <Burger ingredients={this.props.ings} />
                </div>
                {content}

            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        pri: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading,
        isPurchased: state.orderReducer.isPurchased,
        token: state.auth.token,
        userId: state.auth.userID,
        email: state.auth.email,
        error: state.orderReducer.error
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        sendOrder: (orderData,token,userId) => dispatch(OrderActions.placeOrder(orderData,token,userId)),
      
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(CheckoutSummary));