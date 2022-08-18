import React, { Component } from 'react';
import './Playlists.scss';
import { connect } from "react-redux";
import { updatedSongsSearch, updatedPlayingTracks, updatedLyrics } from "./../../Store/Actions/songs-action";
import Songs from './../../Components/Songs/Songs';


const mapDispatchToProps = (dispatch) => {
    return {
      updatedSongsSearchResults: (searchResult) =>
        dispatch(updatedSongsSearch(searchResult)),
        updatedPlayingTracks: (tracks) => dispatch(updatedPlayingTracks(tracks)),
        updatedLyrics: (lyrics) => dispatch(updatedLyrics(lyrics)),
    };
  };

class PlaylistsComponent extends Component {
    state = {  } 

    // For playing song
    chooseTrack = (track) =>  {
        if(this.props.page !== undefined) this.props.showPlaylist(false);
        // this.props.updatePlayistSongs([]);
        this.props.updatedPlayingTracks(track);
        this.props.updatedLyrics("");
        fetch('http://localhost:9000/lyrics/?track='+track.title+'&artist='+ track.artist, { 
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
    render() { 
        return (
                <div className="pcontainer">
                    <div className="gradient"></div>

                         <div className="playlist-container">

                            <div className="playlist-info">
                                
                                <h1>{this.props.playlistTitle}</h1>
                            </div>
             
                        </div>
                            <div>
                                {console.log(this.props.playlist)}
                            { this.props.playlist.map((p,i) => 
                                <Songs key={i} track={p} chooseTrack={this.chooseTrack}></Songs>)}
                            </div>

                </div>
        );
    }
}

const Playlists = connect(null,mapDispatchToProps)(PlaylistsComponent);
export default Playlists;
