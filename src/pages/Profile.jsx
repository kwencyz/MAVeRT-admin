import { useAuth } from "../context/useAuth";
import "../styles/pages/_profile.scss";
import Avatar from "../components/common/Avatar";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar">
          <Avatar
  name={user?.name}
  image={user?.avatar}
  size={60}
/>
        </div>

        <div className="header-info">
          <h2>{user.name}</h2>
          <p className="role-badge">Admin</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="info-row">
          <span className="label">Full Name</span>
          <span className="value">{user.name}</span>
        </div>

        <div className="info-row">
          <span className="label">Email Address</span>
          <span className="value">{user.email}</span>
        </div>

        <div className="info-row">
          <span className="label">Role</span>
          <span className="value">Admin</span>
        </div>

        <div className="info-row">
          <span className="label">Account Status</span>
          <span className="status active">Active</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;