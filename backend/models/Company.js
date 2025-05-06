const mongoose = require("mongoose");

// Define the schema for a company document
const CompanySchema = new mongoose.Schema({
  name: String,            // Company name
  website: String,         // Company website URL
  founded: Number,         // Year the company was founded
  size: String,            // Company size (e.g., "1-10", "11-50", etc.)
  locality: String,        // City or locality
  region: String,          // Region or state
  country: String,         // Country
  industry: String,        // Industry the company belongs to
  linkedin_url: String,    // LinkedIn profile URL
  summary: String          // Short description or summary
});

// Export the Company model
module.exports = mongoose.model("Company", CompanySchema);
