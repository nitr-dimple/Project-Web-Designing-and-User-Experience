import * as actions from './actionTypes';

// updating search result
export const updatedSongsSearch = ( searchResults ) => (
    {
        type: actions.UPDATED_SONGS_SEARCH,
        payload: {
            searchResults
        }
    }
)

// udpating tracks
export const updatedPlayingTracks = (tracks) => (
    {
        type: actions.UPDATED_PLAYING_TRACKS,
        payload: {
            tracks
        }
    }
)

// updating lyrics
export const updatedLyrics = (lyrics) => (
    {
        type: actions.UPDATED_LYRICS,
        payload: {
            lyrics
        }
    }

)

// updating user details
export const updatedUserDetails = ( userDetails ) => (
    {
        type: actions.UPDATED_USER_DETAILS,
        payload: {
            userDetails
        }
    }
)

// updating songs playlist
export const updatedTopSongsPlaylist = ( topSongsPlaylist ) => (
    {
        type: actions.UPDATED_TOP_SONGS_PLAYLIST,
        payload: {
            topSongsPlaylist
        }
    }
)
// update userplaylist
export const updateUserPlaylist = ( userPlaylist ) => (
    {
        type: actions.UPDATED_USER_PLAYLIST,
        payload: {
            userPlaylist
        }
    }
)


export const updateUserPlaylistName = ( selectedPlaylistTitle ) => (
    {
        type: actions.USER_PLAYLIST_NAME,
        payload: {
            selectedPlaylistTitle
        }
    }
)