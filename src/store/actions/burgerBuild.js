import * as actionTypes from './actionTypes';
import axios from '../../components/axios/axiosBurger'


export const addingredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeingredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients

    }
}

const startIngrentsFetch = () => {
    return {
        type: actionTypes.START_INGREDIENT_FETCH,
    }
}

export const initIngredients = () => {
    return dispacth => {
        dispacth(startIngrentsFetch())
        axios.get('/ingredients.json')
            .then(response => {
                // console.log("executed");
                dispacth(setIngredients(response.data));
            })
            .catch(error => console.log(error.response))
    }
}