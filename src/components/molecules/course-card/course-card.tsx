import React from "react";
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
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

  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.innerWrapper}>
        <h5 className={styles.headline}>{headline}</h5>
        <div className={styles.secondRow}>
          <p>{lessons} Lessons</p>
          <Button
            variant="outlined"
            onClick={async () => {
              // const response = await fetch('/api/users/me');
              // const response = await fetch(`/api/users/course_accesses/${course_id}`);
              // const data = await response.json();
              // console.log(data);
              router.push(`/courses/${course_id}`);
            }}
          >
            Continue
          </Button>
        </div>
        <LinearProgress
          variant="determinate"
          value={percent_complete} />
      </div>
    </div>
  );
};

export default CourseCard;
