import { useSavedCompanies } from "../contexts/SavedCompaniesContext";

const SavedProspects = () => {
    // Destructure 'saved' and 'removeCompany' from the context
    const { saved, removeCompany } = useSavedCompanies();

    // Function to handle removal of a company with a confirmation prompt
    const handleRemove = (id) => {
        // Display a confirmation dialog before removing a company
        if (window.confirm("Are you sure you want to remove this company?")) {
            try {
                // Call the removeCompany function with the company ID
                removeCompany(id);
            } catch (err) {
                // If there's an error during removal, alert the user
                alert("Error removing company. Please try again later.");
            }
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Saved Prospects</h2>

            {/* Check if there are no saved companies and show a message */}
            {saved.length === 0 ? (
                <p>No saved companies yet.</p>
            ) : (
                // Display the saved companies in a table
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            {/* Table header for company details */}
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Industry</th>
                            <th className="p-2 border">Country</th>
                            <th className="p-2 border">Size</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over the saved companies and display their details */}
                        {saved.map((company) => (
                            <tr key={company.id}>
                                {/* Display company details in respective columns */}
                                <td className="p-2 border">{company.name}</td>
                                <td className="p-2 border">{company.industry}</td>
                                <td className="p-2 border">{company.country}</td>
                                <td className="p-2 border">{company.size}</td>
                                <td className="p-2 border w-30 text-center">
                                    {/* Button to remove the company, with a hover effect */}
                                    <button
                                        onClick={() => handleRemove(company.id)} // Trigger removal on click
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SavedProspects;
