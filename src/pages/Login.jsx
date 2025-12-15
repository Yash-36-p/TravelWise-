import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trekk3 from "../assets/login2.mp4";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || (isRegister && !name)) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const url = isRegister
      ? "http://localhost:5000/api/user/register"
      : "http://localhost:5000/api/user/login";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("travelwise-user", JSON.stringify(data.user));
    navigate("/dashboard");
  } catch (err) {
    alert("Something went wrong");
  }
};

  const inputStyle = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.35)",
  background: "rgba(255,255,255,0.25)",
  color: "white",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  marginTop: "16px",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
  color: "white",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(37,99,235,0.6)",
};



  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={trekk3} type="video/mp4" />
      </video>

      {/* 🌑 Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      />

<div
  style={{
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "420px",
      padding: "32px",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.25)",
      boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
      color: "white",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: "28px" }}>
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "800",
          letterSpacing: "0.5px",
        }}
      >
        TravelWise ✈️
      </h1>
      <p style={{ opacity: 0.85, fontSize: "14px", marginTop: "6px" }}>
        Smart travel budgeting made simple
      </p>
    </div>


  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

  {isRegister && (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full Name"
      required
      style={inputStyle}
    />
  )}

  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email Address"
    type="email"
    required
    style={inputStyle}
  />

  <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    type="password"
    required
    style={inputStyle}
  />

  <button type="submit" style={buttonStyle}>
    {isRegister ? "Create Account" : "Sign In"}
  </button>
</form>


<div
  style={{
    textAlign: "center",
    marginTop: "18px",
    fontSize: "13px",
    cursor: "pointer",
    opacity: 0.9,
  }}
  onClick={() => setIsRegister(!isRegister)}
>
  {isRegister
    ? "Already have an account? Sign in"
    : "New here? Create an account"}
</div>


    <div
      style={{
        textAlign: "center",
        marginTop: "18px",
        fontSize: "13px",
        opacity: 0.8,
      }}
    >
      {/* Continue as guest • */}
    </div>
  </div>
</div>
</div>
  )
};

export default Login;
