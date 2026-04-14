import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import HotelsPage from './pages/HotelsPage';
import Login from './authentification/login';
import Auth from './authentification/Auth';
import Forgetpassword from './authentification/Forgetpassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forget" element={<Forgetpassword />} />

          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />

          <Route
            path="/hotels"
            element={
              <AppLayout>
                <HotelsPage />
              </AppLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;