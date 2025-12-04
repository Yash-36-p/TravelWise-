import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email to continue.");
      return;
    }

    // Simple client-side "login" — store a user object in localStorage
    const user = { name: name.trim(), email: email.trim() };
    localStorage.setItem("travelwise-user", JSON.stringify(user));

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0f172a 0%, #0b3d91 100%)", padding: "40px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "white", borderRadius: "12px", boxShadow: "0 10px 30px rgba(2,6,23,0.3)", padding: "28px" }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0b3d91" }}>Welcome to TravelWise</h1>
          <p style={{ margin: "8px 0 0", color: "#475569", fontSize: "14px" }}>Sign in to manage your travel budget and expenses</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#334155" }}>Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Priya Sharma" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px" }} required />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#334155" }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px" }} required />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#334155" }}>Password (optional)</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a passphrase (optional)" type="password" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px" }} />
          </div>

          <button type="submit" style={{ marginTop: "8px", padding: "10px 14px", background: "#0b3d91", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer" }}>Sign In</button>

          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "13px", color: "#64748b" }}>
            <span>Or continue as a guest — the app will still save data locally.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
