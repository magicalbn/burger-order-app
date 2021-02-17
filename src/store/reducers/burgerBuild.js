import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        
    },
    totalPrice: 30,
    burgerBuilding: false,
 
}

const INGREDIENTS_PRICE = {
    salad: 15,
    cheese: 15,
    meat: 40,
    chicken: 30,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                burgerBuilding: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                burgerBuilding: true
            };
        case actionTypes.SET_INGREDIENT:{
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    chicken: action.ingredients.chicken,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                }
               
            }
        }
        case actionTypes.START_INGREDIENT_FETCH:{
            return{
                ...state,
                ingredients: {},
                totalPrice: 30,
                burgerBuilding: false
              
            }
        }
        default:
            return state;
    }
}


export default reducer;
