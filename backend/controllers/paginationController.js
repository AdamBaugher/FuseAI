const mongoose = require('mongoose');
const Company = require("../models/Company");

// Function to implement pagination search with cursor-based navigation
async function paginationSearch(req, res) {
    const { searchQuery, filterQuery, offset, cursor, limit = 10 } = req.body;
    const finalQuery = { $and: [filterQuery, searchQuery] };

    // Determine sorting order based on the offset
    const sort = (offset === 'first' || offset > 0) ? { _id: 1 } : { _id: -1 };

    try {
        let results;
        // Handle first and last pages specifically, using cursor-based navigation for others
        if (offset === 'first' || offset === 'last') {
            results = await Company.find(finalQuery).sort(sort).limit(limit);
        } else {
            finalQuery._id = (offset === 'first' || offset > 0)
                ? { $gt: new mongoose.Types.ObjectId(cursor) }
                : { $lt: new mongoose.Types.ObjectId(cursor) };

            results = await Company.find(finalQuery).sort(sort).skip((Math.abs(offset) - 1) * limit).limit(limit);
        }

        // Reverse the results if offset is negative to handle pagination correctly
        if (!(offset === 'first' || offset > 0)) {
            results.reverse();
        }

        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}


// Function to get the total number of pages based on the filter and query
async function totalPages(req, res) {
    try {
        const finalQuery = { $and: [req.body.filterQuery, req.body.searchQuery] };

        // Count the total number of matching documents
        const totalPages = await Company.countDocuments(finalQuery);
        res.json({ totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    paginationSearch,
    totalPages,
};
