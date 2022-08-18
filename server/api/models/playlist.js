import mongoose from 'mongoose';

// Schema for playlist
const Schema = new mongoose.Schema( {
    playlistName: {
        type: String,
        required: 'Last Name Required',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
    }
}, {
    versionKey: false
});

Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true});

const model = mongoose.model('playlist', Schema);

export default model;