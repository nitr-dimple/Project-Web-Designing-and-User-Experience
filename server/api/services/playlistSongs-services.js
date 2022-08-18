import PlaylistSongs from './../models/playlistSongs.js';

/**
 * Function to save new song
 * @param  newSong 
 * @returns newly created song
 */
export const save = (newSong) => {
    const user = new PlaylistSongs(newSong);
    return user.save(); 
}

/**
 * Function to list all the songs
 * @param query 
 * @returns list of all the songs
 */
 export const search = (query) => {
     return PlaylistSongs.find({playlistId: query}).exec();
 }

 /**
 * Function to delete songs for a given id
 * @param id 
 * @returns 
 */
  export const remove = (id) => {
     const playlist = PlaylistSongs.findByIdAndDelete(id).exec();
     return playlist
 }