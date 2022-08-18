import * as actions from './../Actions/actionTypes';
import AppState from './../State';

const reducer = (state=AppState, action) => {
    let loginToken= {}
    switch (action.type) {
        case actions.TOKEN_UPDATED:
            loginToken = action.payload;
            break;
        default:
            loginToken = state.loginToken;
    }
    return Object.assign({}, state, { loginToken });
}

export default reducer;