import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
