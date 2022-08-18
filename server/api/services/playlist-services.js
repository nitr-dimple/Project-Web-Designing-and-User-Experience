import PlayList from './../models/playlist.js';

/**
 * Function to save new playlist item
 * @param  newPlaylist 
 * @returns newly created playlist
 */
export const save = (newPlaylist) => {
    const user = new PlayList(newPlaylist);
    return user.save(); 
}

/**
 * Function to list all the playlist
 * @param query 
 * @returns list of all the playlist
 */
 export const search = (query) => {
    // const params = {...query};
    return PlayList.find({userId: query}).exec();
}

/**
 * Function to get playlist item with particular id
 * @param id 
 * @returns playlist item with given id
 */
 export const get = (id) => {
    const playlist = PlayList.findById(id).exec();
    return playlist;
}

/**
 * Function to update playlist
 * @param updatedPlaylist 
 * @returns updated playlist
 */
 export const update = (updatedPlaylist) => {
    const playlist = PlayList.findByIdAndUpdate(updatedPlaylist.id, updatedPlaylist, {new : true}).exec();
    return playlist;
}

/**
 * Function to delete playlist for a given id
 * @param id 
 * @returns 
 */
 export const remove = (id) => {
    const playlist = PlayList.findByIdAndDelete(id).exec();
    return playlist
}

