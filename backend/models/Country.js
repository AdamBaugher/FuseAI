const mongoose = require("mongoose");

// Define the schema for a country document
const CountrySchema = new mongoose.Schema({
  name: String // Name of the country
});

// Export the Country model
module.exports = mongoose.model("Country", CountrySchema);
