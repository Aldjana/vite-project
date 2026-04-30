import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import HotelsPage from './pages/HotelsPage';
import Login from './authentification/Login';
import Auth from './authentification/Auth';
import ResetPassword from './authentification/ResetPassword';
import { getCurrentUser, getStoredToken } from './services/authApi';

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const verify = async () => {
      const token = getStoredToken();

      if (!token) {
        setStatus('unauthorized');
        return;
      }

      try {
        await getCurrentUser(token);
        setStatus('authorized');
      } catch {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setStatus('unauthorized');
      }
    };

    verify();
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2f3136] text-white">
        Verification de session...
      </div>
    );
  }

  if (status !== 'authorized') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forget" element={<Navigate to="/" replace />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HotelsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;