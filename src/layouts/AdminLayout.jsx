import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../styles/layout/_adminLayout.scss";
import Avatar from "../components/common/Avatar";


function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("patients")) return "Patients";
    if (location.pathname.includes("reports")) return "Reports";
    if (location.pathname.includes("profile")) return "Profile";
    return "Dashboard";
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon"></span>
          MAVeRT Admin
        </div>

        <NavLink to="/dashboard" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/patients" className="nav-item">
          Patients
        </NavLink>

        <NavLink to="/reports" className="nav-item">
          Reports
        </NavLink>

        <NavLink to="/profile" className="nav-item">
          Profile
        </NavLink>
      </aside>

      {/* Main Area */}
      <div className="right-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-title">
  <div className="title-accent"></div>

  <div className="title-text">
    <h3>{getTitle()}</h3>
    <p>MAVeRT Admin Panel</p>
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
