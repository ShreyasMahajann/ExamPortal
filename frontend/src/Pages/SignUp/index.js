import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Style/signup.module.css";
import LeftContainer from "./Components/LeftContainer";
import RightContainer from "./Components/RightContainer";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    const checkRedirect = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/users/testing?token=${token}`
        );
        const redirect = await response.json();
        console.log(redirect.Cookies);
        // res.cookie('jwt', redirect.token, cookieOptions);
        const cookieOptions = {
          expires: 7,
          secure: true,
        };
        Cookies.set("jwt", redirect.token, cookieOptions);
        console.log(redirect);
        localStorage.setItem("jwt", redirect.token);
        localStorage.setItem("user", JSON.stringify(redirect.user));
        if (redirect.result === true) {
          navigate("/testing");
        }
      } catch (error) {
        console.error("Error fetching the testing endpoint:", error);
      }
    };

    if (token) {
      checkRedirect();
    }
  }, [location.search, navigate]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <LeftContainer />
        <RightContainer />
      </div>
    </div>
  );
}

export default Signup;
