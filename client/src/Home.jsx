import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Homepage() {
  const navigate = useNavigate();

  async function logout() {
    const response = await fetch("http://localhost:8000/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      navigate("/");
    }
  }

  return (
    <div className="container">
      <p>This is Homepage, Welcome!</p>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Homepage;
