const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
	{
		commentor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		parent: {
			parentId: String, 
			parentType: String
		},
		children: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment"
			}
		],
		status: String,
		text: String,
		rating: Number
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Comment", cardSchema);
