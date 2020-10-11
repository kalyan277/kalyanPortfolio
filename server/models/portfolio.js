const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const setStringType = (maxLength) => ({
  type: String,
  required: true,
  maxlength: maxLength,
});
const portfolioSchema = new Schema({
  userId: { type: String, required: true },
  title: setStringType(256),
  company: setStringType(128),
  location: setStringType(128),
  position: setStringType(128),
  description: setStringType(2048),
  startDate: { type: Date, required: true },
  endDate: Date,
});

module.exports = mongoose.model('Portfolio',portfolioSchema);