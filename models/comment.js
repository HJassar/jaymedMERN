const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
	{
		parent: {
			type: mongoose.Schema.Types.ObjectId
		},
		text: String,
		rating: Number,
		subComments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment"
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
