import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Index.module.css";
import landingImage from "../assets/LandingPage.webp";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleStartApplying = () => {
    /* navigate("/entry"); */
    void navigate("/newContractLogin");
  };

  // TODO: use <img> element or a <div> with a background image
  return (
    <img
      src={landingImage} // Add your landing image
      alt="Insurance Application"
      className={styles.heroImage}
      onClick={handleStartApplying}
    />
  );
};

export default Index;
