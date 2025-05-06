const express = require("express");
const {
    freeTextSearch,
    filterCompanies,
    enrichCompany
} = require("../controllers/companyController");

const {
    industries,
    countries,
    regions
} = require("../controllers/autocomplete");

const {
    paginationSearch,
    totalPages
} = require("../controllers/paginationController");

const router = express.Router();

// Company-related routes
router.post("/free-text", freeTextSearch);         // Free-text search for companies
router.post("/pagination", paginationSearch);      // Paginated search
router.post("/filter", filterCompanies);           // Filter companies using criteria
router.post("/totalPages", totalPages);            // Get total number of pages for pagination
router.get("/enrich/:id", enrichCompany);          // Enrich company data by ID

// Autocomplete endpoints
router.get("/autocomplete/industry", industries);  // Autocomplete industry names
router.get("/autocomplete/country", countries);    // Autocomplete country names
router.get("/autocomplete/region", regions);       // Autocomplete region names

module.exports = router;
