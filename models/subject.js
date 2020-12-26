const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
	{
		title: String,
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject"
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Card"
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
