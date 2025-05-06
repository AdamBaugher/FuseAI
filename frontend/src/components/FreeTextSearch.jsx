import { useState } from "react";

function FreeTextSearch({ onSearchChange }) {
  // Local state to manage the search query and loading state
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission and trigger search
  const handleSearch = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    if (!query) return;  // If the search query is empty, do nothing

    setLoading(true);  // Set loading state to true while performing the search
    try {
      await onSearchChange(query);  // Trigger the search handler passed as a prop
    } catch (err) {
      console.error("Search failed", err);  // Handle any errors from the search operation
    } finally {
      setLoading(false);  // Reset loading state once the search completes
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
      {/* Input field for search query */}
      <input
        type="text"
        placeholder="e.g. Tech companies in United Kingdom with over 200 employees."
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Update query state on input change
        className="flex-1 p-2 border rounded-md"
      />
      {/* Submit button for search */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
        disabled={loading}  // Disable button while search is in progress
      >
        {loading ? "Searching..." : "Search"}  {/* Toggle button text based on loading state */}
      </button>
    </form>
  );
}

export default FreeTextSearch;
