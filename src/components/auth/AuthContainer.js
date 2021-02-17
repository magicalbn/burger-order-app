import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as authActions from '../../store/actions/ActionsIndex'

import Input from '../UI/Input'
import Spinner from '../Burger/Checkout/Spinner/Spinner'


class AuthContainer extends Component {
    state = {
        contact: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isTouched: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    min: 6
                },
                isTouched: false,
                valid: false
            },
        },
        isSignup: false
    }

    changeHandler = (event, inputIdentifier) => {
        /*  let loginData = { ...this.state.contact };
         let loginElement = loginData[inputIdentifier];
         loginElement.value = event.target.value; */

        let loginData = {
            ...this.state.contact,
            [inputIdentifier]: {
                ...this.state.contact[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.contact[inputIdentifier].validation),
                isTouched: true
            }


        }



        this.setState({ contact: loginData })
    }


    checkValidation = (value, validation) => {
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() != "";
        }
        if (validation.required && validation.min && isValid) {
            isValid = value.length >= validation.min;
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

    FormSubmit = (event) => {
        event.preventDefault();
        // console.log("submitted");
        this.props.AuthInit(this.state.contact.email.value, this.state.contact.password.value, this.state.isSignup)


    }

    changeAuthMode = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    render() {

        let redirect = null;
        if (this.props.isAuthenticated && this.props.burgerBuilt) {
            // console.log("checkout")
            redirect = <Redirect to="/checkout" />;
        }
        else if (this.props.isAuthenticated && !this.props.burgerBuilt)
            redirect = <Redirect to="/" />

        let FormElements = [];
        //console.log(this.state.contact)
        for (let key in this.state.contact) {
            FormElements.push({
                id: key,
                config: this.state.contact[key]
            })
        }

        const content = FormElements.map(each => {
            return <Input key={each.id} config={each.config} changed={(event) => this.changeHandler(event, each.id)} />
        })


        let buttonStatus = (
            <div className="buttons">
                <button type="submit" className="continue">{this.state.isSignup ? "Sign Up" : "Log in"}</button>
            </div>
        )

        if (this.props.loading)
            buttonStatus = <Spinner />



        let error = null;

        if (this.props.error) {
           // console.log(this.props.error)
            switch (this.props.error) {
                case 'EMAIL_EXISTS':
                    error = <p className="error">Error: Mail Id Already Exists</p>
                    break;
                case 'INVALID_EMAIL':
                    error = <p className="error">Error: Invalid Mail Id</p>
                    break;
                case 'WEAK_PASSWORD : Password should be at least 6 characters':
                    error = <p className="error">Weak Password : Password should be at least 6 characters</p>
                    break;
                case 'EMAIL_NOT_FOUND':
                    error = <p className="error">Error: Mail Id not found</p>
                    break;
                case 'INVALID_PASSWORD':
                    error = <p className="error">Error: Incorrect Credentials</p>
                    break;
            }
        }





        return (
            <div className="signup" >
                { redirect}
                <h2 className="title" > Burger App</h2>
                <form onSubmit={this.FormSubmit}>
                    {content}
                    {error}
                    {buttonStatus}
                </form>
                <div className="buttons">
                    <button onClick={this.changeAuthMode} className="cancel">{this.state.isSignup ? "Already Have an Account" : "Create New Account"} </button>
                </div>

            </div >
        );
    }
}

const mapStatetoProps = state => {
    return {
        burgerBuilt: state.burgerBuilderReducer.burgerBuilding,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        AuthInit: (email, password, isSignup) => dispatch(authActions.authInit(email, password, isSignup))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(AuthContainer);