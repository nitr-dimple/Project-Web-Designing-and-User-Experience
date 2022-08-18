import mongoose from 'mongoose';

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
        type:String,
        required: true
        
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

const model1 = mongoose.model('favorite', Schema);

export default model1;