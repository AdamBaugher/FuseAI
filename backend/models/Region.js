const mongoose = require("mongoose");

// Define the schema for a region document
const RegionSchema = new mongoose.Schema({
  name: String // Name of the region
});

// Export the Region model
module.exports = mongoose.model("Region", RegionSchema);
