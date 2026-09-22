import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  return currentView === 'dashboard' ? (
    <Dashboard onLogout={handleLogout} user={user} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
