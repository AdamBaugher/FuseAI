// A functional component to display error messages if present
const ErrorMessage = ({ message }) => {
  // If no message is provided, return null to render nothing
  if (!message) return null;

  // Render the error message with a red color and small text size
  return (
    <div className="text-red-500 text-sm mt-1">
      {message}
    </div>
  );
};

export default ErrorMessage;
