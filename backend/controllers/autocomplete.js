const Industry = require("../models/Industry");
const Country = require("../models/Country");
const Region = require("../models/Region");

// Generic function to get autocomplete suggestions for a model
const getSuggestions = async (Model, query) => {
    if (!query) return [];

    return await Model.find({
        name: { $regex: `^${query}`, $options: "i" } // Case-insensitive prefix match
    })
        .limit(10)               // Limit results to 10 suggestions
        .distinct("name");       // Only return distinct names
};

// Autocomplete for industry names
async function industries(req, res) {
    try {
        const suggestions = await getSuggestions(Industry, req.query.query);
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

// Autocomplete for country names
async function countries(req, res) {
    try {
        const suggestions = await getSuggestions(Country, req.query.query);
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

// Autocomplete for region names
async function regions(req, res) {
    try {
        const suggestions = await getSuggestions(Region, req.query.query);
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    industries,
    countries,
    regions
};
