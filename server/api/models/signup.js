import mongoose from 'mongoose';

// singup schema
const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: 'user-data' }
)

User.virtual('id', () => this._id.toHexString());

const model = mongoose.model('UserData', User)

export default model;