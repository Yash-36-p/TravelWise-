// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import trekk3 from "../assets/trekk3.mp4";



// const Login = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

  

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!name.trim() || !email.trim()) {
//     alert("Please enter your name and email.");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: name.trim(),
//         email: email.trim(),
//       }),
//     });

//     const user = await res.json();

//     // Save MongoDB user
//     localStorage.setItem("travelwise-user", JSON.stringify(user));

//     navigate("/dashboard");
//   } catch (err) {
//     console.error(err);
//     alert("Login failed");
//   }
// };

// //   return (
// //     <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0f172a 0%, #0b3d91 100%)", padding: "40px", boxSizing: "border-box" }}>
// //       <div style={{ width: "100%", maxWidth: "420px", background: "white", borderRadius: "12px", boxShadow: "0 10px 30px rgba(2,6,23,0.3)", padding: "28px" }}>
// //         <div style={{ textAlign: "center", marginBottom: "18px" }}>
// //           <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0b3d91" }}>Welcome to TravelWise</h1>
// //           <p style={{ margin: "8px 0 0", color: "#475569", fontSize: "14px" }}>Sign in to manage your travel budget and expenses</p>
// //         </div>

// //         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
// //           <div>
// //             <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#334155" }}>Full name</label>
// //             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Shah Rukh Khan" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px" }} required />
// //           </div>

// //           <div>
// //             <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#334155" }}>Email</label>
// //             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px" }} required />
// //           </div>

// //           <div>
// //             <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#334155" }}>Password</label>
// //             <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" type="password" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px" }} />
// //           </div>

// //           <button type="submit" style={{ marginTop: "8px", padding: "10px 14px", background: "#0b3d91", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer" }}>Sign In</button>

// //           <div style={{ textAlign: "center", marginTop: "10px", fontSize: "13px", color: "#64748b" }}>
// //             <span>Or continue as a guest</span>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// return (
//   <div
//     style={{
//       position: "relative",
//       minHeight: "100vh",
//       overflow: "hidden",
//     }}
//   >
//     {/* 🎥 Video Background */}
//     <video
//       autoPlay
//       loop
//       muted
//       playsInline
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//         zIndex: 0,
//       }}
//     >
//       {/* <source src="/src/assets/trekk3.mp4" type="video/mp4" /> */}
//       <source src={trekk3} type="video/mp4" />

//     </video>

//     {/* 🌑 Dark Overlay */}
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         backgroundColor: "rgba(0,0,0,0.55)",
//         zIndex: 1,
//       }}
//     />

//     {/* 🌟 LOGIN CARD */}
//     <div
//       style={{
//         position: "relative",
//         zIndex: 2,
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "40px",
//         boxSizing: "border-box",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "420px",
//           background: "rgba(255,255,255,0.95)",
//           borderRadius: "12px",
//           boxShadow: "0 10px 30px rgba(2,6,23,0.4)",
//           padding: "28px",
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         <div style={{ textAlign: "center", marginBottom: "18px" }}>
//           <h1
//             style={{
//               margin: 0,
//               fontSize: "22px",
//               fontWeight: 700,
//               color: "#0b3d91",
//             }}
//           >
//             Welcome to TravelWise
//           </h1>
//           <p
//             style={{
//               margin: "8px 0 0",
//               color: "#475569",
//               fontSize: "14px",
//             }}
//           >
//             Sign in to manage your travel budget and expenses
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//           }}
//         >
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "6px",
//                 fontSize: "13px",
//                 color: "#334155",
//               }}
//             >
//               Full name
//             </label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="e.g., Shah Rukh Khan"
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #e2e8f0",
//                 fontSize: "14px",
//               }}
//               required
//             />
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "6px",
//                 fontSize: "13px",
//                 color: "#334155",
//               }}
//             >
//               Email
//             </label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               type="email"
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #e2e8f0",
//                 fontSize: "14px",
//               }}
//               required
//             />
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "6px",
//                 fontSize: "13px",
//                 color: "#334155",
//               }}
//             >
//               Password
//             </label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Create a password"
//               type="password"
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #e2e8f0",
//                 fontSize: "14px",
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             style={{
//               marginTop: "8px",
//               padding: "10px 14px",
//               background: "#0b3d91",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "15px",
//               cursor: "pointer",
//             }}
//           >
//             Sign In
//           </button>

//           <div
//             style={{
//               textAlign: "center",
//               marginTop: "10px",
//               fontSize: "13px",
//               color: "#e5e7eb",
//             }}
//           >
//             <span>Or continue as a guest</span>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>

// );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trekk3 from "../assets/login1.mp4";

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



//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!email || !password) {
//     alert("Email and password are required");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message); // ❌ Wrong password
//       return;
//     }

//     localStorage.setItem("travelwise-user", JSON.stringify(data.user));
//     navigate("/dashboard");
//   } catch (err) {
//     alert("Login failed");
//   }
// };


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
      {/* 🎥 Video Background */}
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

    {/* 🌟 Login Card */}
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
    {/* HEADER */}
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

    {/* FORM */}

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


    {/* <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
        style={inputStyle}
      />

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
        placeholder="Password (optional)"
        type="password"
        style={inputStyle}
      />

      <button
        type="submit"
        style={{
          marginTop: "16px",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          background:
            "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
          color: "white",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(37,99,235,0.6)",
        }}
      >
        Sign In →
      </button>
    </form> */}

    {/* FOOTER */}
    <div
      style={{
        textAlign: "center",
        marginTop: "18px",
        fontSize: "13px",
        opacity: 0.8,
      }}
    >
      Continue as guest •
    </div>
  </div>
</div>
</div>
  )
};

export default Login;
