import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ccsLogo from './assets/ccs_logo.png';
import './style/Login.css';

const clientId = '667857b4532ba31d7a7d9fb5';
const callbackUrl = 'http://localhost:3000/signup';

const Testing = () => {


  const handleLogin = () => {
    const authUrl = `https://auth.ccstiet.com/auth/google?clientid=${clientId}&callback=${callbackUrl}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <div className="logo-section">
          <img src={ccsLogo} alt="CCS Logo" className="ccs-logo" />
        </div>
        <div className="form-section">
          <h2>CCS Coding Community</h2>
          <button type="button" className="form-button ccs-login" onClick={handleLogin}>
            Login with CCS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testing;