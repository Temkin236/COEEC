import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Staff from './pages/Staff';
import Research from './pages/Research';
import Contact from './pages/Contact';

// Mock component for Academics to avoid empty route error
const Academics = () => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-gray-800">Academic Programs</h1>
    <p className="text-gray-600 mt-4">Curriculum details and calendar coming soon.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/research" element={<Research />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatWidget />
      </Layout>
    </Router>
  );
}

export default App;