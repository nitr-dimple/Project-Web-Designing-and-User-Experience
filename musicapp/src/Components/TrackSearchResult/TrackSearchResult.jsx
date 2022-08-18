import React, { Component } from 'react';
import { connect } from "react-redux";
import { updatedSongsSearch, updatedPlayingTracks, updatedLyrics } from "./../../Store/Actions/songs-action";
import './TrackSearchResult.scss';
import { IoIosHeartEmpty } from "react-icons/io"; 
import { IoIosHeart } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlinePlayCircle } from "react-icons/ai";
import AddPlaylist from './../AddPlaylist/AddPlaylist';
import { Modal, Button } from 'react-bootstrap';
import { ImCheckmark } from "react-icons/im";



const mapDispatchToProps = (dispatch) => {
    return {
      updatedSongsSearchResults: (searchResult) =>
        dispatch(updatedSongsSearch(searchResult)),
        updatedPlayingTracks: (tracks) => dispatch(updatedPlayingTracks(tracks)),
        updatedLyrics: (lyrics) => dispatch(updatedLyrics(lyrics)),
    };
  };
class TrackSearchResultComponent extends Component {

    state = {
        playlist: [],
        showDropDown: false,
        selectedPlaylist: "",
        showFavoriteIcon: false
    }

    // Function to play music anf fetch lyrics on click
    chooseTrack(track) {
        this.props.updatedSongsSearchResults([]);
        this.props.updatedPlayingTracks(track);
        this.props.updatedLyrics("");
        fetch('http://localhost:9000/lyrics/?track='+this.props.track.title+'&artist='+this.props.track.artist, { 
                method: 'GET'
            })
            .then(res => res.json())
            .then(data => {
                this.props.updatedLyrics(data.lyrics);
            })
            .catch((error) => {
                window.location = '/';
                console.log(error);
            });
    }

    // save song to playlist
    addToPlaylist = (track) => {
        fetch('http://localhost:9000/user/'+ localStorage.id +'/playlist', {
			"method": "GET",
			"headers": {
			"content-type": "application/json",
			"accept": "application/json"
			}
		})
		.then(response => response.json())
		.then(json =>{
			this.setState({
				playlist: json
			})
            return json
		})
        .then(json => this.setState({showDropDown : true}))
		.catch((error) => {
			console.log(error);
		});

    }
//  create post for playlist 
    handleCreatePlaylist = (track) => {
        this.setState({showDropDown : false});
        fetch('http://localhost:9000/playlist/'+ this.state.selectedPlaylist +'/songs', {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			body: JSON.stringify({
                artist: track.artist,
                title: track.title,
                uri: track.uri,
                albumUrl: track.albumUrl,
                songId: track.id
			})
		})
		.then(response => {
            this.setState({showDropDown : false})
			if(response.status === 200) return response.json()      
			})
		.catch((error) => {
			console.log(error);
		});
    }

    // Add to favorite songs
    addToFavorite = (track) => {
        this.setState({showDropDown : false});
        this.setState({showFavoriteIcon: true})
        fetch('http://localhost:9000/user/'+ localStorage.id +'/favorites', {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			body: JSON.stringify({
                artist: track.artist,
                title: track.title,
                uri: track.uri,
                albumUrl: track.albumUrl,
                songId: track.id
			})
		})
		.then(response => {
			if(response.status === 200) return response.json()      
			})
        .then(response => console.log(response))
		.catch((error) => {
			console.log(error);
		});
    }

    render() {
        return ( 
            <div className="sr-container" >
                  <div className="sr-item">
                    <img className="albumImage" src={this.props.track.albumUrl}/>
                    <div className="icons">
                            <div>{this.state.showFavoriteIcon ? <IoIosHeart/>
                            : <IoIosHeartEmpty onClick={() => this.addToFavorite(this.props.track)}/> }</div>
                            <div><IoIosAddCircle onClick={() => this.addToPlaylist(this.props.track)} /></div>
                            <div><AiOutlinePlayCircle onClick={() => this.chooseTrack(this.props.track)}/></div>
                    </div>
                    {this.state.showDropDown && this.state.playlist.length !==0 && 
                        <div className="selectPopup">
                            <select name="playlistSelect" onChange={(event) => 
                                    this.setState({selectedPlaylist : event.target.value})}>
                                {this.state.playlist.map((playlist,i) =>
                                    <option value={playlist.id} key={i}> {playlist.playlistName} </option>
                                )}
                            </select>
                            <IoIosAddCircle className="iconSelect" onClick={() => this.handleCreatePlaylist(this.props.track)} />
                        </div>}
                    <div className="ml-3">
                        <div className="title">{this.props.track.title}</div>
                        <div className="description">{this.props.track.artist}</div>
                        
                    </div>
                  </div> 
            </div>
         );
    }
}

const TrackSearchResult = connect(null, mapDispatchToProps)(TrackSearchResultComponent);
 
export default TrackSearchResult;