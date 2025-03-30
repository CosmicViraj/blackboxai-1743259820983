import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Pages
import Home from './pages/Home';
import LoginNew from './pages/LoginNew';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Messages from './pages/Messages';
import JobDetails from './pages/JobDetails';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import JobList from './components/JobList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginNew />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs><JobList /></Jobs>} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;