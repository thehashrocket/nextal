import React from "react";
import Button from "@/components/atoms/button";
import ProgressBar from "@/components/atoms/progress-bar";
import styles from "./course-card.module.css";

interface CourseCardProps {
  headline: string;
  lessons: number;
  percent_complete: number;
  course_id: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  headline,
  lessons,
  percent_complete,
  course_id,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.innerWrapper}>
        <h5 className={styles.headline}>{headline}</h5>
        <div className={styles.secondRow}>
          <p>{lessons} Lessons</p>
          <Button
            onClick={async () => {
              // const response = await fetch('/api/users/me');
              const response = await fetch("/api/users/course_accesses");
              const data = await response.json();
              console.log(data);
            }}
          >
            Continue
          </Button>
        </div>
        <ProgressBar progressPercent={percent_complete} />
      </div>
    </div>
  );
};

export default CourseCard;
