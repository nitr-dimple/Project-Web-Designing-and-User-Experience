import React, { Component } from 'react';
import './Songs.scss';

// Component for displaying songs in playlist
class Songs extends Component {
     state = {  } 
     render() { 
          return (
               <div className="Song-container"  onClick={() => this.props.chooseTrack(this.props.track)}>
                    <img src={this.props.track.albumUrl} style={{ height: "64px", width: "64px" }} />
                    <div className="Song-details">
                         <div>{this.props.track.title}</div>
                         <div className="text-muted">{this.props.track.artist}</div>
                    </div>
               </div>
          );
     }
}
 
export default Songs;