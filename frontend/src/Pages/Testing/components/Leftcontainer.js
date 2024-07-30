import React, { useState } from "react";
import axios from "axios";
import styles from "../Style/leftContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/black-logo.png";
import { api_url } from "../../../config";

const url = api_url + "/users/update";

const LeftContainer = (props) => {
  const [techStack, setTechStack] = useState("");
  const [links, setLinks] = useState("");
  const [nonTech, setNonTech] = useState([]);
  const [nonTechLinks, setNonTechLinks] = useState("");
  const [message, setMessage] = useState("");

  const [button, setButton] = useState(
    <button type="submit" className={styles.button}>
      <div>Submit</div>
      <div className={styles.arrow}>&rarr;</div>
    </button>
  );

  const handleCheck = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setNonTech(prev => [...prev, value]);
    } else {
      setNonTech(prev => prev.filter((e) => e !== value));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setButton(
      <button type="submit" className={styles.button} disabled>
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </button>
    );

    try {
      const resp = await axios.post(url, {
        techStack: techStack,
        links: links,
        nonTechFields: nonTech.toString(),
        nonTechLinks: nonTechLinks,
      });

      setTechStack("");
      setLinks("");
      setNonTech([]);
      setNonTechLinks("");
      const checklist = document.getElementsByTagName("input");
      for (const element of checklist) {
        if (element.type === "checkbox") {
          element.checked = false;
        }
      }

      setButton(
        <button type="submit" className={styles.button} disabled>
          <div>Updated!</div>
        </button>
      );
    } catch (error) {
      setMessage("An error occurred");
      setButton(
        <button type="submit" className={styles.button}>
          <div>Submit</div>
          <div className={styles.arrow}>&rarr;</div>
        </button>
      );
    }
  };

  return (
    <div className={styles.leftContainer}>
      <img src={logo} alt="ccs-logo" className={styles.logo} />
      <h3 className={styles.heading}>Update Your Profile</h3>
      <form
        action=""
        onSubmit={submitForm}
        className={styles.leftContainerForm}
      >
        <input
          type="text"
          name="techStack"
          id="techStack"
          autoComplete="off"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="Tech Stack"
          className={styles.inputBox}
        />
        <input
          type="text"
          name="links"
          id="links"
          autoComplete="off"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder="Links (Github, Codechef, etc.)"
          className={styles.inputBox}
        />
        <div className={styles.checkboxes}>
          <div className={styles.checkHeading}>Select the Non-Tech fields you wish to contribute to (if any)</div>
          <div className={styles.check}>
            <input
              type="checkbox"
              name="nonTechDomain"
              id="marketing"
              value="Marketing"
              onChange={handleCheck}
            />
            <label htmlFor="marketing">Marketing</label>
          </div>
          <div className={styles.check}>
            <input
              type="checkbox"
              name="nonTechDomain"
              id="contentWriting"
              value="Content Writing"
              onChange={handleCheck}
            />
            <label htmlFor="contentWriting">Content Writing</label>
          </div>
          <div className={styles.check}>
            <input
              type="checkbox"
              name="nonTechDomain"
              id="designing"
              value="Designing"
              onChange={handleCheck}
            />
            <label htmlFor="designing">Designing</label>
          </div>
          <div className={styles.check}>
            <input
              type="checkbox"
              name="nonTechDomain"
              id="videoEditing"
              value="Video Editing"
              onChange={handleCheck}
            />
            <label htmlFor="videoEditing">Video Editing</label>
          </div>
        </div>
        <input
          type="text"
          name="nonTechLinks"
          id="nonTechLinks"
          autoComplete="off"
          value={nonTechLinks}
          onChange={(e) => setNonTechLinks(e.target.value)}
          placeholder="Link to any Non-Tech work"
          className={styles.inputBox}
        />
        {button}
        <small>{message}</small>
      </form>
    </div>
  );
};

export default LeftContainer;