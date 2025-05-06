import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import AutocompleteInput from "./Input/AutocompleteInput"; 
import SizeSelector from "./Input/SizeSelector"; 
import YearRangeInput from "./Input/YearRangeInput"; 
import { BACKEND_URL } from "../constants";
import FilterInput from "./Input/FilterInput";

// This is the main component that manages the state of all filters and handles the form submission.
export default function CompanyFilters({ onFilterChange }) {
  // State to hold all the filter values.
  const [filters, setFilters] = useState({
    name: "",
    website: "",
    foundedMin: "",
    foundedMax: "",
    size: "",
    locality: "",
    region: "",
    country: "",
    industry: "",
  });

  const [showMore, setShowMore] = useState(false); // State to toggle additional filters.
  const [error, setError] = useState(""); // State for error messages.

  // Function to update the filter values in state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission, ensuring the "Founded from" is not greater than "Founded to".
  const handleSubmit = () => {
    const { foundedMin, foundedMax } = filters;

    // Validation check for "Founded from" and "Founded to" years.
    if (foundedMin && foundedMax && parseInt(foundedMin) > parseInt(foundedMax)) {
      setError("Founded 'From' year cannot be greater than 'To' year.");
      return;
    }

    setError(""); // Clear error if validation is passed.

    // Filter out any empty values from the filters object and send to parent component.
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    onFilterChange(filteredFilters);
  };

  // Fetch industry suggestions from the backend API.
  const fetchIndustrySuggestions = async (query) => {
    return fetch(`${BACKEND_URL}/api/companies/autocomplete/industry?query=${query}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  // Fetch country suggestions from the backend API.
  const fetchCountrySuggestions = async (query) => {
    return fetch(`${BACKEND_URL}/api/companies/autocomplete/country?query=${query}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  // Fetch region suggestions from the backend API.
  const fetchRegionSuggestions = async (query) => {
    return fetch(`${BACKEND_URL}/api/companies/autocomplete/region?query=${query}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  return (
    <div className="mb-6 p-4 border rounded bg-white shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Company name input */}
        <FilterInput
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Name"
        />

        {/* Industry Autocomplete input */}
        <AutocompleteInput
          name="industry"
          value={filters.industry}
          onChange={handleChange}
          fetchSuggestions={fetchIndustrySuggestions}
          placeholder="Industry"
        />

        {/* Country Autocomplete input */}
        <AutocompleteInput
          name="country"
          value={filters.country}
          onChange={handleChange}
          fetchSuggestions={fetchCountrySuggestions}
          placeholder="Country"
        />

        {showMore && (
          <>
            {/* Region Autocomplete input */}
            <AutocompleteInput
              name="region"
              value={filters.region}
              onChange={handleChange}
              fetchSuggestions={fetchRegionSuggestions}
              placeholder="Region"
            />
            {/* Website input */}
            <FilterInput
              name="website"
              value={filters.website}
              onChange={handleChange}
              placeholder="Website"
            />
            {/* Year range input (Founded from/to) */}
            <YearRangeInput
              minYear={1800}
              maxYear={new Date().getFullYear()}
              onChange={handleChange}
              filters={filters}
            />
            {/* Size dropdown selector */}
            <SizeSelector
              size={filters.size}
              onChange={handleChange}
            />
            {/* Locality input */}
            <FilterInput
              name="locality"
              value={filters.locality}
              onChange={handleChange}
              placeholder="Locality"
            />
          </>
        )}
      </div>
      {/* Error message if validation fails */}
      <ErrorMessage message={error} />

      <div className="mt-4 flex items-center gap-4">
        {/* Filter button */}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Filter
        </button>
        {/* Toggle button to show/hide additional filters */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
