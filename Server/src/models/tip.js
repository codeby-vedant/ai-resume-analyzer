const mongoose = require("mongoose");
const { Schema } = mongoose;
const tipSchema = new Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  tip: {
    type: String,
    required: true,
  },
});
const tipModel = mongoose.model("tipModel", tipSchema);
module.exports = tipModel;
