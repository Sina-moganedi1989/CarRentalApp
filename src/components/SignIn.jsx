import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCustomers");

      if (response.data && response.data.result) {
        const customers = response.data.data;

        const user = customers.find(
          (cust) =>
            cust.email.trim().toLowerCase() === email.trim().toLowerCase() &&
            cust.mobileNo.trim() === mobileNo.trim()
        );

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setMessage(`✅ Welcome, ${user.customerName}! Redirecting to dashboard...`);
  
            // Navigate after 2 seconds
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);

        } else {
          setMessage("❌ Invalid email or mobile number.");
        }
      } else {
        setMessage("❌ Error fetching customers.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage("❌ Something went wrong!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{color:"blue", fontSize:"20px"}}>Email:</label><br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{color:"blue",fontSize:"20px"}}>Mobile No:</label><br />
          <input
            type="tel"
            required
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Enter mobile number"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px", width: "100%", backgroundColor:"red" }}>
          Sign In
        </button>
      </form>
      {message && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}

export default SignIn;
