import * as actions from './actionTypes';

export const tokenUpdated = ( accessToken, refreshToken, expiresIn) => (
    {
        type: actions.TOKEN_UPDATED,
        payload: {
            accessToken,
            refreshToken,
            expiresIn
        }
    }
)