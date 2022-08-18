import { request, response } from 'express';
import * as userService from './../services/user-services.js';

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

/**
 * Function to create user
 * @param request 
 * @param response 
 */
export const post = async (request, response) => {
    try {
        const payload = request.body;
        const user = await userService.save(payload);
        setSuccessResponse(user, response);
    }catch (error) {
        setErrorResponse(error, response);
    }   
}

/**
 * Function to get all user
 * @param request 
 * @param response 
 */
 export const index = async (request, response) => {
    try {
        const query = {};
        const user = await userService.search(query);
        setSuccessResponse(user, response);

    }catch (error){
        setErrorResponse(error, response);
    }
}