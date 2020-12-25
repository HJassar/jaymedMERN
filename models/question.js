const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
	{
		stem: String,
		explanation: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
