import * as actions from './../Actions/actionTypes';
import AppState from './../State';

const reducer = (state=AppState, action) => {
    let loginState;

    switch (action.type) {
        case actions.UPDATED_LOGIN_DETAILS:
            loginState = Object.assign({}, state.loginState, { email: action.payload.email, password: action.payload.password});
            break;
        case actions.UPDATED_LOGIN_RESPONSE:
            loginState = Object.assign({}, state.loginState, { res: action.payload });
            break;
        default:
            loginState = state.loginState;
    }
    return Object.assign({}, state, { loginState });
}

export default reducer;