import React, { Component } from "react";
import { connect } from "react-redux";
import SpotifyWebAPI from "spotify-web-api-node";
import authentication from "./../../config";
import { updatedSongsSearch, updatedPlayingTracks, updatedTopSongsPlaylist, updatedUserDetails } from "./../../Store/Actions/songs-action";
import { updatedLoginResponse } from './../../Store/Actions/login-actions'
import { Container, Form } from "react-bootstrap";
import TrackSearchResult from "./../../Components/TrackSearchResult/TrackSearchResult";
// import Player from "../../Components/Player/Player";
import './Homepage.scss';
import Music from "../../Components/Music/Music";
import Playlists from './../Playlists/Playlists';

// function for spotify authentication
const spotifyApi = new SpotifyWebAPI({
  clientId: authentication.clientId,
});

const mapStateToProps = (state) => {
  return {
    loginToken: state.token.loginToken,
    songsDetail: state.songDetails,
    loginDetails: state.loginDetails.loginState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatedSongsSearchResults: (searchResult) => dispatch(updatedSongsSearch(searchResult)),
    updatedPlayingTracks: (tracks) => dispatch(updatedPlayingTracks(tracks)),
    updatedTopSongsPlaylist: (topSongsPlaylist) => dispatch(updatedTopSongsPlaylist(topSongsPlaylist)),
    updatedLoginResponse: (response) => dispatch(updatedLoginResponse(response)),
    updatedUserDetails: (userDetails) => dispatch(updatedUserDetails(userDetails)),
    
  };
};

class HomeComponent extends Component {
  state = {
    showPlaylist: false,
    playlistSongsList: [],
    playlistName: ""
  }
  

  handleShowPlaylist = (value,title) =>{
      this.setState({showPlaylist:value,playlistName:title});
    }

  // Function to send accessToken to spotify
  sendAccessToken(accessToken) {
    if (!accessToken) return false;
    spotifyApi.setAccessToken(accessToken);
  }

  //   Function to search for music
  handleSearch(search) {
    if (!search) return this.props.updatedSongsSearchResults([]);
    if (search && localStorage.accessToken) {
      spotifyApi.searchTracks(search).then((res) => {
        let searchResults = [];
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          const data = {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
          searchResults.push(data);
          return searchResults;
        });
        return this.props.updatedSongsSearchResults(searchResults);
      });
    }
  }

  // function to fetch top popular songs
  fetchPopularSongs() {
    let accessToken = localStorage.accessToken;
    fetch("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let searchResults = [];
        res.playlists.items.map((track) => {
          const smallestAlbumImage = track.images[0];
          const data = {
            id:track.id,
            description: track.description,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            playlistsUrl: track.tracks.href,
          };
          searchResults.push(data);
          return searchResults;
        });
        return this.props.updatedTopSongsPlaylist(searchResults);
      })
      .catch((error) => {
        window.location = "/";
        console.log(error);
      });
  }

  updatePlayistSongsArray = (list) => {
    this.setState({
      playlistSongsList: list
    })
  }

  

  render() {
    // sending authentication accessToken
    localStorage.accessToken && this.sendAccessToken(localStorage.accessToken);
    spotifyApi.getAccessToken() && this.fetchPopularSongs();

    return (
      <div className="home">
        <div className="musicDiv">
          <Container className="d-flex py-2 containerClass" >
            <div className="top-menu">
              {/* for search box */}
              <Form.Control className="formControl" type="search" placeholder="Search Songs/Artists" onChange={(e) => spotifyApi.getAccessToken() && this.handleSearch(e.target.value)}/>
              <div>
                {/* {this.props.userData.name} */}
              </div>
            </div>

           

            {/* search result */}
            <div className="search-songs flex-grow-1 my-2" style={{ overflowY: "auto" }}>

              {this.props.songsDetail.songState.searchResults.length !== 0 && <h2 className="section-title">Search Result</h2>}
              {this.props.songsDetail.songState.searchResults.length !== 0 && 
                <div className="suggestion-container" style={{ overflowY: "auto" }}>
                {this.props.songsDetail.songState.searchResults.map(
                  (track, i) => (
                    <TrackSearchResult track={track} key={i} />
                  )
                )}
                {this.props.songsDetail.songState.searchResults.length ===0 && (
                  <div style={{ whiteSpace: "pre", color: "white" }}>
                    {this.props.songsDetail.songState.lyrics}
                  </div>
                )}
              </div>
              }

              {this.state.showPlaylist && this.state.playlistSongsList.length !== 0 &&<Playlists playlist={this.state.playlistSongsList} showPlaylist= {this.handleShowPlaylist} updatePlayistSongs= {this.updatePlayistSongsArray} playlistTitle={this.state.playlistName}></Playlists>}

              {/* Popular songs */}
              <h2 className="section-title">Popular Playlist</h2>
              
                <div className="suggestion-container">
                  {this.props.songsDetail.songState.topSongsPlaylist.length !==
                    0 &&
                    this.props.songsDetail.songState.topSongsPlaylist.map(
                      (track, i) => <Music track={track} key={i} showPlaylist= {this.handleShowPlaylist} updatePlayistSongs= {this.updatePlayistSongsArray} accessToken={this.props.loginToken["accessToken"]}/>
                    )}
                </div>
            </div>
          </Container>
        </div>
      </div>
     
    );
  }
}
const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default Home;
