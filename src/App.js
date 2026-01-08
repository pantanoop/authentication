import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoute from "./Dashboard/ProtectedRoute";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Login />
            </Box>
          }
        />
        <Route
          path="/register"
          element={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Register />
            </Box>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
