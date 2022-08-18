import * as actions from './../Actions/actionTypes';
import AppState from './../State';

const reducer = (state=AppState, action) => {
    let searchResults;
    let songState;
    let topSongsPlaylist;
    let userDetails;
    let userPlaylist = [];
    let selectedPlaylistTitle;

    switch (action.type) {
        case actions.UPDATED_SONGS_SEARCH:
            searchResults = action.payload.searchResults;
            songState =  Object.assign({}, state.songState, { searchResults });
            break;
        case actions.UPDATED_PLAYING_TRACKS:
            songState =  Object.assign({}, state.songState, { playingTrack: action.payload.tracks });
            break;
        case actions.UPDATED_LYRICS:
            songState =  Object.assign({}, state.songState, { lyrics: action.payload.lyrics });
            break;
        case actions.UPDATED_TOP_SONGS_PLAYLIST:
            topSongsPlaylist = action.payload.topSongsPlaylist;
            songState =  Object.assign({}, state.songState, { topSongsPlaylist });
            break;
        case actions.UPDATED_USER_DETAILS:
            userDetails = action.payload.userDetails;
            songState =  Object.assign({}, state.songState, { userDetails });
            break;
        case actions.UPDATED_USER_PLAYLIST:
            userPlaylist = action.payload.userPlaylist;
            songState =  Object.assign({}, state.songState, { userPlaylist });
            break;
        case actions.USER_PLAYLIST_NAME:
            selectedPlaylistTitle = action.payload.selectedPlaylistTitle;
            songState =  Object.assign({}, state.songState, { selectedPlaylistTitle });
            break;
        default:
            songState = state.songState;
    }
    return Object.assign({}, state, { songState });
}

export default reducer;