const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		roles: { type: [String], default: ['student'] },
		username: { type: String, unique: true, required: true },
		displayName: String,
		email: { type: String, unique: true, required: true },
		quizzes: [
			{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Quiz"
			}
		],
		readCards: [
			{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Card"
			}
		],
		avatar: String,
		password: String
	},
	{ timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

module.exports = mongoose.model('User', userSchema);