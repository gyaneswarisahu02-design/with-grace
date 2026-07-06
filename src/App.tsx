import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Log from "./pages/Log";
import Insights from "./pages/Insights";
import Pause from "./pages/Pause";
import Settings from "./pages/Settings";
import Welcome from "./pages/Welcome";

type Profile = {
  name: string;
  quitDate: string;
  urgesResisted: number;
  createdAt: string;
};

export default function App() {
  const profile: Profile | null = JSON.parse(
    localStorage.getItem("profile") || "null"
  );

  const hasProfile = !!profile;

  return (
    <Routes>
      <Route
        path="/"
        element={
          hasProfile ? (
            <Dashboard />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route
        path="/welcome"
        element={
          hasProfile ? (
            <Navigate to="/" replace />
          ) : (
            <Welcome />
          )
        }
      />

      <Route
        path="/log"
        element={
          hasProfile ? (
            <Log />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route
        path="/insights"
        element={
          hasProfile ? (
            <Insights />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route
        path="/pause"
        element={
          hasProfile ? (
            <Pause />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route
        path="/settings"
        element={
          hasProfile ? (
            <Settings />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />
    </Routes>
  );
}