import React from "react";
import styles from "./progress-bar.module.css";

interface ProgressBarProps {
  progressPercent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercent }) => {
  return (
    <div className={styles.barOuter}>
      <div
        className={styles.barInner}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
