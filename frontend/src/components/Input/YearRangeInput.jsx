// This component handles two input fields for selecting the year range of "Founded from" and "Founded to".
export default function YearRangeInput({ minYear, maxYear, onChange, filters }) {
    return (
      <div className="flex space-x-2">
        {/* Input for "Founded from" year */}
        <input
          type="number"
          min={minYear}
          max={maxYear}
          name="foundedMin"
          placeholder="Founded from"
          value={filters.foundedMin}
          onChange={onChange}
          className="border p-2 px-3 w-full rounded-md text-sm"
        />
        {/* Input for "Founded to" year */}
        <input
          type="number"
          min={minYear}
          max={maxYear}
          name="foundedMax"
          placeholder="Founded to"
          value={filters.foundedMax}
          onChange={onChange}
          className="border p-2 px-3 w-full rounded-md text-sm"
        />
      </div>
    );
  }
  