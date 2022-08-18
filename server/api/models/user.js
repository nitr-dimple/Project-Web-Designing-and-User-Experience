import mongoose from 'mongoose';

// user schema
const Schema = new mongoose.Schema(
	{
		name: { 
            type: String
        },
		email: { 
            type: String, required: true
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'signup',
        }
	}, {
          versionKey: false
      }
);
Schema.set('toJSON', { virtuals: true});

const model = mongoose.model('User', Schema);

export default model;