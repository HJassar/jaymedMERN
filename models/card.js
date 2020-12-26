const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		level: Number,
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment"
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
