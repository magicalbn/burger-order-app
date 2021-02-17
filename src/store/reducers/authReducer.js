import * as actionTypes from '../actions/actionTypes'

const initialStage = {
    token: null,
    userID: null,
    email: null,
    error: null,
    loading: false

}

const authStart = (state, action) => {
    return {
        ...state,
        error:null,
        loading: true
    }
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        userID: action.userID,
        email: action.email,
        loading: false
    }
}
const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

const logOut = (state, action) => {
    return {
        ...state,
        token: null,
        userID: null,
        email: null
    }
}

const reducer = (state = initialStage, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAILED: return authFail(state,action);
        case actionTypes.LOG_OUT: return logOut(state,action);
        default: {
            return state
        }
    }
}

export default reducer;