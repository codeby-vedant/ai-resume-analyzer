const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    analysis: {
      score: {type:Number,Default:null},
      strengths: [String],
      weaknesses: [String],
      missingKeywords: [String],
      suggestions: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const resumeModel = mongoose.model("resumeModel", resumeSchema);
module.exports = resumeModel;
