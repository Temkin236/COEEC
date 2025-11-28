
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Staff from './pages/Staff';
import StaffProfile from './pages/StaffProfile';
import Research from './pages/Research';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Academics from './pages/Academics';
import Students from './pages/Students';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Downloads from './pages/Downloads';

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
          <Route path="/staff/:id" element={<StaffProfile />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:id" element={<ProjectDetail />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/students" element={<Students />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/downloads" element={<Downloads />} />
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
