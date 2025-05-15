import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChevronRight, Menu, ChevronDown } from 'lucide-react';

// Components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import Donors from './pages/Donors';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Styles
import './assets/scss/custom.scss';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // This would be replaced with an actual API call
    console.log('Login with:', credentials);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <h3 className="mb-0">Parish Finance</h3>
            <button className="btn-toggle" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          </div>
          <div className="sidebar-content">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="bi bi-house-door"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              
              <li className="nav-item">
                <a href="/income" className="nav-link">
                  <i className="bi bi-graph-up-arrow"></i>
                  <span>Income</span>
                </a>
              </li>
              
              <li className="nav-item">
                <a href="/expenses" className="nav-link">
                  <i className="bi bi-cash-coin"></i>
                  <span>Expenses</span>
                </a>
              </li>
              
              <li className="nav-item dropdown">
                <a 
                  href="#" 
                  className="nav-link dropdown-toggle" 
                  onClick={() => toggleDropdown('reports')}
                >
                  <i className="bi bi-file-earmark-text"></i>
                  <span>Reports</span>
                  {activeDropdown === 'reports' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </a>
                <ul className={`dropdown-menu ${activeDropdown === 'reports' ? 'show' : ''}`}>
                  <li>
                    <a href="/reports/monthly" className="dropdown-item">Monthly</a>
                  </li>
                  <li>
                    <a href="/reports/quarterly" className="dropdown-item">Quarterly</a>
                  </li>
                  <li>
                    <a href="/reports/annual" className="dropdown-item">Annual</a>
                  </li>
                  <li>
                    <a href="/reports/custom" className="dropdown-item">Custom</a>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <a href="/donors" className="nav-link">
                  <i className="bi bi-people"></i>
                  <span>Donors</span>
                </a>
              </li>
              
              <li className="nav-item dropdown">
                <a 
                  href="#" 
                  className="nav-link dropdown-toggle"
                  onClick={() => toggleDropdown('settings')}
                >
                  <i className="bi bi-gear"></i>
                  <span>Settings</span>
                  {activeDropdown === 'settings' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </a>
                <ul className={`dropdown-menu ${activeDropdown === 'settings' ? 'show' : ''}`}>
                  <li>
                    <a href="/settings/profile" className="dropdown-item">Profile</a>
                  </li>
                  <li>
                    <a href="/settings/categories" className="dropdown-item">Categories</a>
                  </li>
                  <li>
                    <a href="/settings/users" className="dropdown-item">Users</a>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
          <header className="main-header">
            <button 
              className="btn btn-sm btn-icon d-md-none" 
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button 
                  className="btn btn-sm dropdown-toggle d-flex align-items-center" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <div className="avatar me-2">
                    <span>JD</span>
                  </div>
                  <span className="d-none d-md-inline">John Doe</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><a className="dropdown-item" href="/settings/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          </header>

          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports/*" element={<Reports />} />
              <Route path="/donors" element={<Donors />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="main-footer">
            <div className="container-fluid">
              <span>&copy; 2025 Parish Finance Manager. All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;