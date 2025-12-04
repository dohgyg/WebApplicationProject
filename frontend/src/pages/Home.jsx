import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>

      {/* HERO SECTION */}
      <div
        style={{
          margin: "40px auto",
          width: "90%",
          maxWidth: "900px",
          background: "white",
          padding: "40px 30px",
          borderRadius: "25px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "38px", fontWeight: "600", color: "#6c63ff" }}>
          📘 My Library
        </h1>

        <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>
          Your personal digital library — beautifully organized.
        </p>

        {/* CTA BUTTONS */}
        <div style={{ marginTop: "25px" }}>
          {!user && (
            <>
              <Link to="/login">
                <button className="btn-primary" style={{ width: "180px" }}>
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button
                  className="btn-primary"
                  style={{
                    width: "180px",
                    background:
                      "linear-gradient(135deg, #a993ff, #6c63ff)",
                    marginLeft: "15px",
                  }}
                >
                  Register
                </button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/books">
                <button className="btn-primary" style={{ width: "180px" }}>
                  View Books
                </button>
              </Link>

              <Link to="/add-book">
                <button
                  className="btn-primary"
                  style={{
                    width: "180px",
                    marginLeft: "15px",
                  }}
                >
                  Add Book
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div
        style={{
          margin: "30px auto",
          width: "90%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#555", marginBottom: "20px" }}>
          Why Choose My Library?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="feature-card">
            <h3>📚 Easy Book Management</h3>
            <p>Add, update, and delete books in seconds.</p>
          </div>

          <div className="feature-card">
            <h3>🔐 Secure Login</h3>
            <p>Protected with JWT authentication.</p>
          </div>

          <div className="feature-card">
            <h3>🎨 Clean Modern UI</h3>
            <p>Pastel-themed interface for a smooth experience.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "40px",
          padding: "20px",
          textAlign: "center",
          color: "#888",
        }}
      >
        © 2025 My Library — COMP229 Final Project
      </footer>
    </div>
  );
}
