import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SavedProspects from "./pages/SavedProspects";

function App() {
  const location = useLocation();

  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link
          to="/"
          className={`mr-4 text-blue-600 ${location.pathname === '/' ? 'font-bold' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/saved"
          className={`text-blue-600 ${location.pathname === '/saved' ? 'font-bold' : ''}`}
        >
          Saved Prospects
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedProspects />} />
        {/* Fallback for undefined routes */}
        <Route
          path="*"
          element={<div className="text-red-500">404 - Page Not Found</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
