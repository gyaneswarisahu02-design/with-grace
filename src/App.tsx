import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Log from "./pages/Log";
import Insights from "./pages/Insights";
import Pause from "./pages/Pause";
import Settings from "./pages/Settings";
import Welcome from "./pages/Welcome";

export default function App() {
  const hasName = !!localStorage.getItem("name");

  return (
    <Routes>
      <Route
        path="/"
        element={
          hasName ? (
            <Dashboard />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route
        path="/welcome"
        element={
          hasName ? (
            <Navigate to="/" replace />
          ) : (
            <Welcome />
          )
        }
      />

      <Route path="/log" element={<Log />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/pause" element={<Pause />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}