import { request, response } from 'express';
import * as favoriteServices from './../services/favorite-services.js';

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

/**
 * Function to create playlist
 * @param request 
 * @param response 
 */
export const post = async (request, response) => {
    try {
        const payload = request.body;
        const id = request.params.userId;
        payload.userId = id;
        const favorites = await favoriteServices.save(payload);
        setSuccessResponse(favorites, response);
    }catch (error) {
        setErrorResponse(error, response);
    }   
}

/**
 * Function to get playlist with particular id
 * @param request 
 * @param response 
 */
 export const get = async(request, response) => {
    try {
        const id = request.params.userId;
        const favorites = await favoriteServices.search(id);
        console.log(favorites)
        setSuccessResponse(favorites, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}

/**
 * Function to update playlist
 * @param request 
 * @param response 
 */
 export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        if(updated.userId !== undefined) {
            return response.status(400).json({
                success: false,
                error: "You can not modify userid or playlistid"
            });
        };
        const playlist = await favoriteServices.update(updated);
        setSuccessResponse(playlist, response);
    }catch(error) {
        setErrorResponse(error, response);
    }
}

/**
 * Function to delete playlist
 * @param request 
 * @param response 
 */
 export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const playlist = await favoriteServices.remove(id);
        setSuccessResponse({message: `Successfully Removed ${id}`}, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}