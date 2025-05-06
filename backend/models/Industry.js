const mongoose = require("mongoose");

// Define the schema for an industry document
const IndustrySchema = new mongoose.Schema({
  name: String // Name of the industry
});

// Export the Industry model
module.exports = mongoose.model("Industry", IndustrySchema);
