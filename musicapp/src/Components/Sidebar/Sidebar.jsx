import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from './../Sidebar/logo.png';
import { NavLink } from "react-router-dom";
import PlaylistList from './../PlaylistList/PlaylistList';
import "./Sidebar.scss";
//importing icons
//dropdown
// import { FiChevronDown } from "react-icons/fi"; 
// import { FiChevronUp } from "react-icons/fi";
//homeicon
import { AiOutlineHome } from "react-icons/ai"; 
// import { AiFillHome } from "react-icons/ai"; //focus
//playlist
import { IoIosAddCircleOutline } from "react-icons/io"; 
// import { IoIosAddCircle } from "react-icons/io"; //focus
//favorites
import { IoIosHeartEmpty } from "react-icons/io"; 
// import { IoIosHeart } from "react-icons/io"; 
//history
// import { BiHistory } from "react-icons/bi"; 
import { IoIosAdd } from "react-icons/io";

const mapStateToProps = (state) => {
	return {
	  loginToken: state.token.loginToken,
	  songsDetail: state.songDetails,
	  loginDetails: state.loginDetails.loginState
	};
   };


class SidebarComponent extends Component {

	state = {
		createPlaylistToggle: false,
		playlist: [],
		playlistName: "",
		fetchPlaylist: false,
		userId:"",
		showLogout: false
	  } 
	
	//   Call all existing playlists
	componentDidMount() {
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
		})
		.catch((error) => {
			console.log(error);
		});
		}

	
	// create  new playlist
	handleOnClickPlaylist() {
		this.setState({createPlaylistToggle: true});
	}

	
	

	// function to create a new playlist
	handleCreatePlaylist() {
		
		const playlistName = this.state.playlistName;
		fetch('http://localhost:9000/user/'+ localStorage.id +'/playlist', {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			body: JSON.stringify({
				playlistName: playlistName
			})
		})
		.then(response => {
			if(response.status === 200) return response.json()      
			})
		.then(data => {
			this.setState( prevState => (
			{
				playlist : [...prevState.playlist, data]
			}
			)) 
			// alert(`Successfully Added!`);
			this.setState({createPlaylistToggle: false});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	// Function to update playlist
	handleUpdateplaylist = (playlistDetails) => {
		const userId = playlistDetails.userId;
		const id = playlistDetails.id;
		fetch('http://localhost:9000/user/'+ localStorage.id + '/playlist/'  + id, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			body: JSON.stringify({
				playlistName: playlistDetails.playlistName
			})
		})
		.then(response => {
			if(response.status === 200) return response.json()      
			})
		.catch((error) => {
			console.log(error);
		});
	}

	// function to delete playlist
	handleDeletePlaylist = (playlistDetails) => {
		const userId = playlistDetails.userId;
		const id = playlistDetails.id;
		fetch('http://localhost:9000/user/'+ localStorage.id + '/playlist/'  + id, {
			method: "DELETE"
		})
		.then(response => {
			if(response.status === 200) {
				this.setState( { playlist: this.state.playlist.filter(playl => playl.id !== id) });
				// alert(`Deleted task successfully`);
			}
		}
		);
	}


	logout = () =>{
		fetch('http://localhost:9000/logout', { method: 'POST' })
    		.then(response => {
		console.log(response.status);
		if ((response.status) === 200) {
			localStorage.setItem('token', "tokenExpired");
			localStorage.setItem('id', null)
			
			alert('Logged Out');
			
			
			window.location.href = '/login';
			// window.location.href = '/dashboard
		} else {
			alert('Please check your username and password')
		}
	})
	}

	// function to show logout button 
	handlerUser() {
		this.setState( { showLogout: true});
	}

	render() { 
		return (
			<div className="sidebar-container">

				{/* logo */} 
				<img src={logo} alt="logo" href="http://localhost:3000/home" className="logo"/> 

				<div className="userName" onClick={() => this.handlerUser()}>
					Hello {localStorage.name},
				</div>


				{this.state.showLogout && <button onClick={this.logout} type="button" className="logoutbutton">
						 Logout
				</button>}	

				{/* navigation links */} 
				<NavLink to="/home" className="menu" activeclassname="menu-active">
						<AiOutlineHome className='iconstyle' /> <span>Home</span>
				</NavLink>

				<NavLink to="/favorites" className="menu" activeclassname="menu-active">
						<IoIosHeartEmpty className='iconstyle'/> <span>favorites</span>
				</NavLink>	

				<div>
				<NavLink to="" className="menu" activeclassname="menu-active" onClick={() => this.handleOnClickPlaylist()}>
						<IoIosAddCircleOutline className='iconstyle' /> <span>Create Playlist</span>
				</NavLink>

				{/* Onclick createplaylist */}
				{this.state.createPlaylistToggle &&
					<div className="list-container">
						<input className="shadow appearance-none border rounded text-grey-darker createplaylist" name="text" id="text" placeholder="Create Playlist" onChange={event => this.setState({ playlistName: event.target.value })} />
						<IoIosAdd className="addIcon" onClick={() => this.handleCreatePlaylist()} />
					</div>
				 }
				 {	this.state.playlist.length > 0 && 
					 this.state.playlist.map((playlist,id) => <PlaylistList playlist={playlist} key={id} onUpdate={this.handleUpdateplaylist} onRemove= {this.handleDeletePlaylist}></PlaylistList>)
				 }

				</div>
					 	
			</div>
		);
	}
}
const Sidebar = connect(mapStateToProps)(SidebarComponent);

export default Sidebar;