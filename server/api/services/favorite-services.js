import Favorite from './../models/favorite.js';

/**
 * Function to save new playlist item
 * @param  newFavorite 
 * @returns newly created playlist
 */
export const save = (newFavorite) => {
    const user = new Favorite(newFavorite);
    return user.save(); 
}

/**
 * Function to list all the faviorite
 * @param query 
 * @returns list of all the favorite
 */
 export const search = (id) => {
    return Favorite.find({userId: id}).exec();
}

/**
 * Function to get playlist item with particular id
 * @param id 
 * @returns playlist item with given id
 */
 export const get = (id) => {
    const favorite = Favorite.find({userId: id}).exec();
    return favorite;
}

/**
 * Function to update playlist
 * @param updatedPlaylist 
 * @returns updated playlist
 */
 export const update = (updatedPlaylist) => {
    const favorite = Favorite.findByIdAndUpdate(updatedPlaylist.id, updatedPlaylist, {new : true}).exec();
    return favorite;
}

/**
 * Function to delete playlist for a given id
 * @param id 
 * @returns 
 */
 export const remove = (id) => {
    const favorite = Favorite.findByIdAndDelete(id).exec();
    return favorite
}

