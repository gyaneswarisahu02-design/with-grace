import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white">
      <div className="max-w-md mx-auto flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex-1 text-center py-3 text-xs ${
              isActive ? "text-[#315A8B] font-semibold" : "text-slate-400"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex-1 text-center py-3 text-xs ${
              isActive ? "text-[#315A8B] font-semibold" : "text-slate-400"
            }`
          }
        >
          Check In
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `flex-1 text-center py-3 text-xs ${
              isActive ? "text-[#315A8B] font-semibold" : "text-slate-400"
            }`
          }
        >
          Progress
        </NavLink>

        <NavLink
          to="/pause"
          className={({ isActive }) =>
            `flex-1 text-center py-3 text-xs ${
              isActive ? "text-[#315A8B] font-semibold" : "text-slate-400"
            }`
          }
        >
          Pause
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex-1 text-center py-3 text-xs ${
              isActive ? "text-[#315A8B] font-semibold" : "text-slate-400"
            }`
          }
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
}