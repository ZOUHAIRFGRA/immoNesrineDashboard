import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ClientList from "./components/clients/ClientList";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import { useState, useEffect } from "react";
import axios from "axios";
import AddClientForm from "./components/clients/AddClient";
import EmployeePage from "./components/employees/EmployeePage";
import ProjectAssignmentForm from "./components/ProjectAssignmentForm";
import ProjectPage from "./components/projects/ProjectPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_URL}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Sidebar />}
        <div className="main">
          <Routes>
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            {/* Use PrivateRoute for protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <ClientList />
                </PrivateRoute>
              }
            />
            <Route
              path="/addclient"
              element={
                <PrivateRoute>
                  <AddClientForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <PrivateRoute>
                  <EmployeePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignProject"
              element={
                <PrivateRoute>
                  <ProjectAssignmentForm />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
