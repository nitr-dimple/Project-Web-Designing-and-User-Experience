import React, { Component } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Playlists from '../Playlists/Playlists';
import {  updatedPlayingTracks } from "./../../Store/Actions/songs-action";
import { connect } from "react-redux";
import SpotifyWebAPI from "spotify-web-api-node";
import authentication from "../../config";
import Player from "../../Components/Player/Player";

const spotifyApi = new SpotifyWebAPI({
  clientId: authentication.clientId,
});

const mapStateToProps = (state) => {
  return {
    loginToken: state.token.loginToken,
    songsDetail: state.songDetails,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    updatedPlayingTracks: (tracks) => dispatch(updatedPlayingTracks(tracks)),
  };
};

class FavoritesComponent extends Component {

    state = {
        songsList: []
    }

    sendAccessToken(accessToken) {
        if (!accessToken) return false;
        spotifyApi.setAccessToken(accessToken);
    }

    componentDidMount() {
        fetch('http://localhost:9000/user/'+ localStorage.id +'/favorites', {
                "method": "GET",
                "headers": {
                "content-type": "application/json",
                "accept": "application/json"
                }
            })
            .then(response => {
                return response.json()})
            .then(json =>{
                this.setState({
                    songsList: json
                })
                return json
            })
            .then(json => console.log(json))
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
      localStorage.accessToken && this.sendAccessToken(localStorage.accessToken);
        return (
        <div className="favorite-container">
          
           
            <div className="main">
                 {/* <div className= 'sidebar'>
                    <Sidebar/>     
                </div>   */}
                <div className = 'container-home'>
                    <div className = 'playlist'>
                            <Playlists playlistTitle={"Favorites"} playlist={this.state.songsList}/>
                    </div>  
                </div>
 
            </div>
            
            <div className="player">
                     <Player accessToken={spotifyApi.getAccessToken()}
                      trackUri={this.props.songsDetail.songState.playingTrack.uri}/>
                </div>
        </div>
            
                
          
        );
    }
}
const Favorites = connect(mapStateToProps,mapDispatchToProps)(FavoritesComponent);
export default Favorites;