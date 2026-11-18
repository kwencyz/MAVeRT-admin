import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../styles/layout/_adminLayout.scss";
import Avatar from "../components/common/Avatar";

function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getTitle = () => {
    if (location.pathname.includes("patients")) return "Patients";
    if (location.pathname.includes("reports")) return "Reports";
    if (location.pathname.includes("profile")) return "Profile";
    return "Dashboard";
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-icon"></span>
          MAVeRT Admin
        </div>

        <NavLink to="/dashboard" className="nav-item" onClick={closeSidebar}>
          Dashboard
        </NavLink>

        <NavLink to="/patients" className="nav-item" onClick={closeSidebar}>
          Patients
        </NavLink>

        <NavLink to="/reports" className="nav-item" onClick={closeSidebar}>
          Reports
        </NavLink>

        <NavLink to="/profile" className="nav-item" onClick={closeSidebar}>
          Profile
        </NavLink>
      </aside>

      {/* Main Area */}
      <div className="right-content">
        {/* Topbar */}
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="topbar-title">
              <div className="title-accent"></div>
              <div className="title-text">
                <h3>{getTitle()}</h3>
                <p>MAVeRT Admin Panel</p>
              </div>
            </div>
          </div>

          <div className="topbar-right">
            <div className="profile">
              <Avatar name={user?.name} image={user?.avatar} size={50} />
              <span className="user-name">{user?.name || "Kumar Chen"}</span>
            </div>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
