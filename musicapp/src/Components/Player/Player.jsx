import React, { Component } from 'react';
import SpotifyPlayer from "react-spotify-web-playback"

// Player component for playing music
class Player extends Component {
    state = {
        play: false,
        trackUri: ""
    }

    render() {
        if(!localStorage.accessToken) return null;
        let trackUri = this.props.trackUri;
        if(trackUri !== this.state.trackUri) {
            this.setState({
                play: true,
                trackUri: trackUri
            });
        }
        return (
            <SpotifyPlayer token={localStorage.accessToken}
            callback={state => state.isPlaying ? this.setState({ play: true }) : this.setState({ play: false })}
            play={this.state.play}
            uris= {this.props.trackUri ? [this.props.trackUri] : []}
            initialVolume = {0.5}
            magnifySliderOnHover= {true} 
            />
        );
    }
}
 
export default Player;