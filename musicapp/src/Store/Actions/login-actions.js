import * as actions from './actionTypes';

export const updatedLoginDetails = ( email, password ) => (
     {
         type: actions.UPDATED_LOGIN_DETAILS,
         payload: {
             email,
             password
         }
     }
 )

 export const updatedLoginResponse = ( res ) => (
    {
        type: actions.UPDATED_LOGIN_RESPONSE,
        payload: res
    }
)