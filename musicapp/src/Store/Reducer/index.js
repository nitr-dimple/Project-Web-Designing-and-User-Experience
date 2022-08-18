import tokenReducer from './token-reducer';
import songReducer from './songs-reducer';
import loginReducer from './login-reducer';
import {combineReducers} from 'redux'

const reducer = combineReducers({
    token : tokenReducer,
    songDetails : songReducer,
    loginDetails : loginReducer 

});

export default reducer;