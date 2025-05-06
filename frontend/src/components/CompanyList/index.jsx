// CompanyList.jsx
// Main component to render a list of companies with summary modals and save functionality

import { useEffect, useState } from "react";
import axios from "axios";
import SummaryModal from "./SummaryModal";
import CompanyTable from "./CompanyTable";
import { BACKEND_URL } from "../../constants";
import { useSavedCompanies } from "../../contexts/SavedCompaniesContext";
import { capitalizeFirstLetter } from "./helpers";

function CompanyList({ companies, loadingCompanies, page }) {
  // State to store fetched summaries and loading status per company
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState({});

  // Modal state (open status and selected company ID)
  const [modalData, setModalData] = useState({ open: false, companyId: null });

  // Access saved companies context
  const { saved, addCompany } = useSavedCompanies();

  // Check if a company has already been saved
  const isSaved = (id) => saved.some((company) => company.id === id);

  // Initialize summaries with any pre-fetched data from `companies` prop
  useEffect(() => {
    const initialSummaries = {};
    companies.forEach((company) => {
      if (company.summary) {
        initialSummaries[company._id] = company.summary;
      }
    });
    setSummaries(initialSummaries);
  }, [companies]);

  // Fetch company summary from backend
  const fetchSummary = async (id) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/companies/enrich/${id}`);
      setSummaries((prev) => ({ ...prev, [id]: res.data.summary }));
    } catch (error) {
      console.error("Failed to enrich:", error);
      setSummaries((prev) => ({ ...prev, [id]: "Failed to load summary." }));
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Handle "Show Summary" button click
  const handleShowSummary = async (company) => {
    const id = company._id;

    // Fetch summary only if not already loaded or loading
    if (!summaries[id] && !loading[id]) {
      setLoading((prev) => ({ ...prev, [id]: true }));
      await fetchSummary(id);
    }

    // Open modal for the selected company
    setModalData({ open: true, companyId: id });
  };

  // Close the modal
  const closeModal = () => {
    setModalData({ open: false, companyId: null });
  };

  // Get the selected company and its summary/loading state
  const selectedCompany = companies.find((company) => company._id === modalData.companyId);
  const summary = summaries[modalData.companyId];
  const isLoading = loading[modalData.companyId];

  return (
    <div className="overflow-x-auto">
      <CompanyTable
        companies={companies}
        page={page}
        summaries={summaries}
        loading={loading}
        handleShowSummary={handleShowSummary}
        isSaved={isSaved}
        addCompany={addCompany}
        loadingCompanies={loadingCompanies}
      />

      <SummaryModal
        open={modalData.open}
        onClose={closeModal}
        title={capitalizeFirstLetter(selectedCompany?.name)}
        content={summary}
        loading={isLoading}
      />
    </div>
  );
}

export default CompanyList;
