import { request, response } from 'express';
import * as playlistService from './../services/playlist-services.js';

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
        const userId = request.params.id;
        let payload = request.body;
        payload.userId = userId;
        const playlist = await playlistService.save(payload);
        setSuccessResponse(playlist, response);
    }catch (error) {
        setErrorResponse(error, response);
    }   
}

/**
 * Function to get all playlist
 * @param request 
 * @param response 
 */
export const index = async (request, response) => {
    try {
        const query = {};
        const playlist = await playlistService.search(request.params.id);
        setSuccessResponse(playlist, response);

    }catch (error){
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
        const id = request.params.id;
        const playlist = await playlistService.get(id);
        setSuccessResponse(playlist, response);

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
        const userId = request.params.userId;
        const updated = {...request.body};
        if(updated.userId !== undefined) {
            return response.status(400).json({
                success: false,
                error: "You can not modify userid or playlistid"
            });
        };
        updated.userId = userId;
        updated.id = id;
        const playlist = await playlistService.update(updated);
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
        const playlist = await playlistService.remove(id);
        setSuccessResponse({message: `Successfully Removed ${id}`}, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}