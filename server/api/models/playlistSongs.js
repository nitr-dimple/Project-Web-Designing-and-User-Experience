import mongoose from 'mongoose';

// Schema for playlist
const Schema = new mongoose.Schema( {


     artist: {
          type:String
     },
     title: {
          type: String
     },
     uri: {
          type: String
     },
     albumUrl: {
          type: String
     },
     songId: {
          type: String,
          required: 'songid required',
     },
     playlistId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'playlist',
    }
}, {
    versionKey: false
});

Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true});

const model = mongoose.model('playlistSongs', Schema);

export default model;