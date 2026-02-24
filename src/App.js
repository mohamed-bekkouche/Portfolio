import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetailsPage from "./components/Portfolio";
import Main from "./pages/Main";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Router>
      <div className="App w-full min-h-[100dvh]">
        {loading ? (
          <div className="w-full h-[100dvh] flex justify-between">
            <div className="w-1/2 bg-secondary h-full width-shring"></div>
            <div className="w-1/2 bg-secondary h-full width-shring"></div>
          </div>
        ) : (
          <>
            <div id="layerFilter" className="layerFilter"></div>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/project/:projectId"
                element={<ProjectDetailsPage />}
              />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
