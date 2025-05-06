import { useEffect, useRef } from "react";

function SummaryModal({ open, onClose, title, content, loading }) {
  // Create a ref to the modal for detecting clicks outside
  const modalRef = useRef(null);

  useEffect(() => {
    // Function to handle click outside the modal to close it
    const handleClickOutside = (e) => {
      // If the click is outside the modal, close it
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Function to handle pressing the Escape key to close the modal
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    // Add event listeners when the modal is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside the modal
      document.addEventListener("keydown", handleEsc); // Listen for the Escape key press
    }

    // Cleanup event listeners when the modal is closed or component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]); // Re-run effect when `open` or `onClose` changes

  // If the modal is not open, return null to not render anything
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef} // Attach the ref to detect clicks outside
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        
        {/* Conditional rendering based on loading state */}
        {loading ? (
          <div className="text-gray-500 text-sm">Loading summary...</div>
        ) : (
          <p className="text-gray-700 text-sm whitespace-pre-wrap">{content}</p>
        )}

        {/* Close button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose} // Close the modal when clicked
            className="px-4 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
