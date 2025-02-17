import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SingleDamperPage from './pages/SingleDamperPage';
import BulkOrderPage from './pages/BulkOrderPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import ResourcesPage from './pages/ResourcesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/configure" element={<SingleDamperPage />} />
        <Route path="/bulk-order" element={<BulkOrderPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </Router>
  );
}

export default App; 