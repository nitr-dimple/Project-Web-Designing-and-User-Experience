import React, { Component } from 'react';
import './Music.scss';
import { IoIosHeartEmpty } from "react-icons/io"; 
import { IoIosHeart } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import Playlists from './../../Pages/Playlists/Playlists';
import { Popup } from 'react-bootstrap';

class Music extends Component {



    fetchAllSongs = (track) => {
        let accessToken = localStorage.accessToken;
        fetch(track.playlistsUrl, {
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
            res.items.map((item) => {
                const smallestAlbumImage = item.track.album.images.reduce(
                    (smallest, image) => {
                    if (image.height < smallest.height) return image;
                    return smallest;
                    },
                    item.track.album.images[0]
                );
                const data = {
                    id: item.track.id,
                    artist: item.track.artists[0].name,
                    title: item.track.name,
                    uri: item.track.uri,
                    albumUrl: smallestAlbumImage.url,
                };
                searchResults.push(data);
            })
            return searchResults;
        })
        .then(searchResults => {
            this.props.updatePlayistSongs(searchResults);
        })
        .catch((error) => {
            window.location = "/";
            console.log(error);
            });
        
        this.props.showPlaylist(true,track.title);
    }
    

    render() { 
        return (
            <div className="item-container" onClick={() => this.fetchAllSongs(this.props.track)}>
                  <div className="item">
                    <img className="albumImage" src={this.props.track.albumUrl} />
                    <div className="ml-3">
                        <div className="title">{this.props.track.title}</div>
                        <div className="description">{this.props.track.description}</div>
                        
                    </div>
                  </div>              
            </div>
        );
    }
}
 
export default Music;