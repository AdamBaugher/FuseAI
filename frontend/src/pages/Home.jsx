import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import FreeTextSearch from "../components/FreeTextSearch";
import CompanyFilters from "../components/CompanyFilters";
import CompanyList from "../components/CompanyList";
import Pagination from "../components/Pagination";

function Home() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [filterQuery, setFilterQuery] = useState({});
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetches companies based on filter and search query
  const fetchCompanies = async (url, params) => {
    setLoading(true);
    try {
      const response = await axios.post(url, params);
      if (response.data) {
        setCompanies(response.data.data);
        setSearchQuery(response.data.query);
        setFilterQuery(response.data.query);
        setPage(1);
        updateTotalPages(response.data.query, searchQuery);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update total pages based on the filter and search query
  const updateTotalPages = async (filterQuery, searchQuery) => {
    try {
      setTotalPages(-1); // Reset the total pages while fetching
      const response = await axios.post(`${BACKEND_URL}/api/companies/totalPages`, {
        filterQuery,
        searchQuery,
      });
      setTotalPages(Math.ceil(response.data.totalPages / limit));
    } catch (error) {
      console.error("Error fetching total pages:", error);
    }
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

  // Handle page change for pagination
  const onPageChange = async (newPage) => {
    setLoading(true);
    try {
      const offset =
        newPage === 1 ? "first" : newPage === totalPages ? "last" : newPage - page;
      const direction = offset === "first" || offset > 0 ? "forward" : "backward";
      const response = await axios.post(`${BACKEND_URL}/api/companies/pagination`, {
        offset,
        cursor:
          direction === "forward"
            ? companies[companies.length - 1]._id
            : companies[0]._id,
        filterQuery,
        searchQuery,
      });

      setCompanies(response.data);
      setPage(newPage);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FreeTextSearch onSearchChange={onSearchChange} />
      <CompanyFilters onFilterChange={onFilterChange} />
      <CompanyList companies={companies} loadingCompanies={loading} page={page} />
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

export default Home;
