import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Log from "./pages/Log";
import Insights from "./pages/Insights";
import Pause from "./pages/Pause";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/log" element={<Log />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/pause" element={<Pause />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}