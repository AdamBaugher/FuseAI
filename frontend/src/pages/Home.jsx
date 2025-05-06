import { useState } from "react";
import { BACKEND_URL } from "../constants";
import FreeTextSearch from "../components/FreeTextSearch";
import CompanyFilters from "../components/CompanyFilters";

function Home() {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [filterQuery, setFilterQuery] = useState({});

    // Fetches companies based on filter and search query
    const fetchCompanies = async (url, params) => {
        console.log(url, params);
    };

    // Handle filter change, update companies based on filter
    const onFilterChange = (filters) => {
        const params = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {});

        fetchCompanies(`${BACKEND_URL}/api/companies/filter`, { ...params, searchQuery });
    };

    // Handle search change, update companies based on search query
    const onSearchChange = (search) => {
        fetchCompanies(`${BACKEND_URL}/api/companies/free-text`, { query: search, filterQuery });
    };


    return (
        <div>
            <FreeTextSearch onSearchChange={onSearchChange} />
            <CompanyFilters onFilterChange={onFilterChange} />
        </div>
    );
}

export default Home;
