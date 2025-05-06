// Responsible for rendering the company table UI

function CompanyTable({
    companies,
    page,
    summaries,
    loading,
    handleShowSummary,
    loadingCompanies
}) {
    return (
        <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Industry</th>
                    <th className="p-2 border">Country</th>
                    <th className="p-2 border">Size</th>
                    <th className="p-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                {loadingCompanies && (
                    <tr>
                        <td className="p-2 text-center" colSpan={6}>
                            Loading companies.
                        </td>
                    </tr>
                )}
                {!loadingCompanies && !companies.length && (
                    <tr>
                        <td className="p-2 text-center" colSpan={6}>
                            No companies.
                        </td>
                    </tr>
                )}
                {!loadingCompanies &&
                    companies.map((company, index) => {
                        const id = company._id;
                        return (
                            <tr key={id} className="border-t hover:bg-gray-50">
                                <td className="p-2 border">{(page - 1) * 10 + index + 1}</td>
                                <td className="p-2 border">{company.name}</td>
                                <td className="p-2 border">{company.industry}</td>
                                <td className="p-2 border">{company.country}</td>
                                <td className="p-2 border">{company.size}</td>
                                <td className="p-2 border w-40 text-center">
                                    <button
                                        onClick={() => handleShowSummary(company)}
                                        className={`${summaries[id] ? "bg-blue-800" : "bg-blue-500"} w-30 text-white px-3 py-1 rounded`}
                                    >
                                        {loading[id] ? "Loading..." : "Show Summary"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}

export default CompanyTable;
