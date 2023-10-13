import React from "react";
import styles from "./basic-card.module.css";

interface BasicCardProps {
  headline: string;
  bodytext: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ headline, bodytext }) => {
  return (
    <div className={styles.card}>
      <h5 className={styles.cardTitle}>{headline}</h5>
      <p className={styles.cardText}>{bodytext}</p>
    </div>
  );
};

export default BasicCard;
