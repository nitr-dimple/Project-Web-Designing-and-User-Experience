import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Playlists from '../Playlists/Playlists';
import Home from '../Home/Homepage';
import './UserPlaylist.scss';
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

class DashboardComponent extends Component {

    sendAccessToken(accessToken) {
    if (!accessToken) return false;
    spotifyApi.setAccessToken(accessToken);
  }
    render() {
      localStorage.accessToken && this.sendAccessToken(localStorage.accessToken);
        return (
        <div className="userplaylist-container">
          
           
            <div className="main">

                <div className = 'container-home'>
                  {/* <div className= 'sidebar'>
                    <Sidebar/>     
                  </div>  */}
                  <div className = 'playlist'>
                          <Playlists playlistTitle={this.props.songsDetail.songState.selectedPlaylistTitle} playlist={this.props.songsDetail.songState.userPlaylist}/>
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
const Dashboard = connect(mapStateToProps,mapDispatchToProps)(DashboardComponent);
export default Dashboard;