import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="form-card">
        <h2>Profile</h2>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>My Profile</h2>

      <div style={{ marginTop: "15px", lineHeight: "1.8" }}>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>User ID:</strong> {user._id}
        </p>
      </div>
    </div>
  );
}
