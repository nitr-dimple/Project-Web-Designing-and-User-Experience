import { request, response } from 'express';
import * as playlistSongsService from './../services/playlistSongs-services.js';

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

/**
 * Function to create playlist songs
 * @param request 
 * @param response 
 */
export const post = async (request, response) => {
    try {
        const playlistId = request.params.id;
        let payload = request.body;
        payload.playlistId = playlistId;
        const playlistSongs = await playlistSongsService.save(payload);
        setSuccessResponse(playlistSongs, response);
    }catch (error) {
        setErrorResponse(error, response);
    }   
}

/**
 * Function to get all songs
 * @param request 
 * @param response 
 */
 export const index = async (request, response) => {
     try {
         const query = {};
         const songs = await playlistSongsService.search(request.params.id);
         setSuccessResponse(songs, response);
 
     }catch (error){
         setErrorResponse(error, response);
     }
 }

 /**
 * Function to delete songs
 * @param request 
 * @param response 
 */
  export const remove = async(request, response) => {
     try {
         const id = request.params.songsId;
         const playlist = await playlistSongsService.remove(id);
         setSuccessResponse({message: `Successfully Removed ${id}`}, response);
 
     }catch(error) {
         setErrorResponse(error, response);
     }
 }