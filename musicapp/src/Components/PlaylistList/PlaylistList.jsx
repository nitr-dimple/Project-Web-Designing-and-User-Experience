import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi"; 
import { MdDelete } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { connect } from "react-redux";
import './PlaylistLIst.scss';
import { updateUserPlaylist, updateUserPlaylistName } from "./../../Store/Actions/songs-action";


const mapDispatchToProps = (dispatch) => {
     return {
          updateUserPlaylist: (updatedPlaylist) => dispatch(updateUserPlaylist(updatedPlaylist)),
          updateUserPlaylistName: (name) => dispatch(updateUserPlaylistName(name)),
       
     };
   };
class PlaylistListComponent extends Component {
     state = {
          updatePlaylist : false,
          playlistName :'',
          playlist: []
     }

     // for updating playlist
     handleOnUpdate = (playlist) => {
          playlist.playlistName =  this.state.playlistName
          this.setState({updatePlaylist: false});
          this.props.onUpdate(playlist);
     }

     // handling playlist call
     handlePlaylistCall = () => {
          console.log(this.props.playlist.id)
          fetch('http://localhost:9000/playlist/'+ this.props.playlist.id +'/songs', {
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
               this.props.updateUserPlaylist(json);
               this.props.updateUserPlaylistName(this.props.playlist.playlistName)
               console.log(JSON.parse(localStorage.getItem("userPlaylist")))
		})
		.catch((error) => {
			console.log(error);
		});
		
     }

     render() {
          return (
               <div >
               {this.state.updatePlaylist === false&& 
               <div className="playlist_container">
                    <NavLink to="/userplaylist" className="menu" activeclassname="menu-active" onClick={() => this.handlePlaylistCall()}>
                         <span>{this.props.playlist.playlistName}</span>
                    </NavLink>
                    <FiEdit2 className="addIcon" onClick={() => this.setState({updatePlaylist : true})}/>
                    <MdDelete className="addIcon" onClick={() => this.props.onRemove(this.props.playlist)}/>
               </div>}

               {this.state.updatePlaylist &&
                    <div className="playlist_container">
                         <input className="shadow appearance-none border rounded text-grey-darker createplaylist" name="text" id="text" placeholder="Edit Playlist" defaultValue={this.props.playlist.playlistName} onChange={event => this.setState({ playlistName: event.target.value })} />
                         <ImCheckmark className="addIcon" onClick={() => this.handleOnUpdate(this.props.playlist)} />
                    </div>}
               </div>
               
               
          );
     }
}
const PlaylistList = connect(null, mapDispatchToProps)(PlaylistListComponent);
export default PlaylistList;