import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import Sidebar from './../../Components/Sidebar/Sidebar';
import Playlists from './../../Pages/Playlists/Playlists';
import Home from './../Home/Homepage';
import './Dashboard.scss';

import { connect } from "react-redux";
import SpotifyWebAPI from "spotify-web-api-node";
import authentication from "./../../config";
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

class DashboardComponent extends Component {

    sendAccessToken(accessToken) {
    if (!accessToken) return false;
    spotifyApi.setAccessToken(accessToken);
  }
    render() { 
      localStorage.accessToken && this.sendAccessToken(localStorage.accessToken);
    
        return (
        <div className="dashboard-container">
            <div className="main">
                <div className= 'sidebar'>
                        <Sidebar/>  
                </div> 
                <div className = 'container-home'>
                  {/* <Home/> */}
                  {/* <Playlists/> */}
                    <Routes>
                        <Route path="/"  exact element={<Home/>}/>
                        {/* <Route path="/playlists"  element={}/> */}
                    </Routes>
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
const Dashboard = connect(mapStateToProps)(DashboardComponent);
export default Dashboard;