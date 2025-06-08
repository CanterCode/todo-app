import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
  return (
    <div className="spinner-wrapper">
      <div className="custom-spinner"></div>
    </div>
  );
}
  if (error)
    return (
      <div className="text-center text-danger mt-5">Oops: {error.message}</div>
    );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="edit/:id" element={<EditTask />} />
        <Route path="details/:id" element={<TaskDetails />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
