// src/components/LoginPage.js
import React, { useState, useEffect } from "react";
import "./Login.css"; // Import the CSS file
import "bootstrap/dist/css/bootstrap.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    const script = document.createElement("script");
    
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    if (username === "admin" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="left-half">
        <center>
          <div className="image-container">
            <img src="ccs_logo.png" alt="Logo" />
          </div>
        </center>
        <center>
          <div className="learn-code-collaborate">
            <div className="container text-center">
              <div className="row">
                <div className="col">Learn</div>
                <div className="col">Code</div>
                <div className="col">Collaborate</div>
              </div>
            </div>
          </div>
        </center>
      </div>
      <div className="right-half">
        <h2>Login Page</h2> {/* Moved "Login Page" text above the form */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;