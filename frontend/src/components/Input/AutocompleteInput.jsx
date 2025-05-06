import React, { useState, useEffect, useRef } from 'react';

function AutocompleteInput({ value, onChange, fetchSuggestions, placeholder, name }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manualSelection, setManualSelection] = useState(false);
  const wrapperRef = useRef(null);

  // Handle clicks outside the input to hide suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions with debounce when value changes
  useEffect(() => {
    if (!value || manualSelection) {
      setSuggestions([]);
      setManualSelection(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      if (value) {
        setLoading(true);
        fetchSuggestions(value)
          .then((data) => setSuggestions(data))
          .catch((error) => console.error('Error fetching suggestions:', error))
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [value]);

  // Handle the selection of a suggestion
  const handleSelect = (suggestion) => {
    onChange({ target: { name, value: suggestion } });
    setManualSelection(true);
    setSuggestions([]);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
      {loading && <div className="absolute top-full left-0 text-sm">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border mt-1 max-h-40 overflow-auto shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}  
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteInput;
