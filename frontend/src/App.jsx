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
import Axios from "axios";
import AddClientForm from "./components/clients/AddClient";
import EmployeePage from "./components/employees/EmployeePage";
import ProjectAssignmentForm from "./components/ProjectAssignmentForm";
import ProjectPage from "./components/projects/ProjectPage";
import WorkerPage from "./components/workers/WorkerPage";
import AssignWorkerPrj from "./components/workers/AssignWorkerPrj";
import ProjectForm from "./components/projects/ProjectForm";
import WorkerForm from "./components/workers/WorkerForm";
import ExpensesPage from "./components/expenses/ExpensesPage";
import MaterialForm from "./components/materials/MaterialForm";
import MaterialsPage from "./components/materials/MaterialPage";
import RentsList from "./components/materials/RentList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  Axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_URL}`;
  const token = localStorage.getItem("token");
  if(token) { Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;}
  useEffect(() => {
    // Axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_URL}`;
    console.log(Axios.defaults.baseURL) // https://immonesrine-api.vercel.app/api/v1
   
    if (token) {
      setIsLoggedIn(true);
      console.log('true')
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
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
              path="/addproject"
              element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/addworker"
              element={
                <PrivateRoute>
                  <WorkerForm />
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
              path="/addmaterial"
              element={
                <PrivateRoute>
                  <MaterialForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/materials"
              element={
                <PrivateRoute>
                  <MaterialsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/rents"
              element={
                <PrivateRoute>
                  <RentsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/rentMaterial"
              element={
                <PrivateRoute>
                  <MaterialsPage />
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
            <Route
              path="/workers"
              element={
                <PrivateRoute>
                  <WorkerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <PrivateRoute>
                  <ExpensesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignPrjToWorker"
              element={
                <PrivateRoute>
                  <AssignWorkerPrj />
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
