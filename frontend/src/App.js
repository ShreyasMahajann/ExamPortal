import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Test from "./Pages/Test";
import Signup from "./Pages/SignUp";
import Testing from "./Pages/Testing";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Disqualified from "./Pages/Disqualified";
import Instructions from "./Pages/Instructions";
import Submitted from "./Pages/Submitted";
import { slot1_time, slot2_time } from "./config.js";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const isAuthenticated = () => {
    // Example: Check if user is authenticated based on your application's logic
    return Cookies.get('jwt') !== undefined; // Example using cookies
  };
 
 
  const updateState = () => {
    // Function to update state, if needed
  };

  const checkDeadline = () => {
    // Function to check deadline, if needed
  };

  return (
    // Example: Use the 'authenticated' state to conditionally render routes  

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/instructions"
            element={<Instructions updateState={updateState} />}
          />
          <Route path="/test" element={<Navigate to="/login" />} />
          <Route path="/submitted" element={<Submitted />} />
          <Route path="/disqualified" element={<Disqualified />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
