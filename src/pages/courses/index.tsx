import { useEffect, useState } from "react";
import axios from "axios";
import BasicCard from "@/components/molecules/basic-card";
import CourseCard from "@/components/molecules/course-card";
import styles from "./courses.module.css";
import { CourseAccess } from "src/types/course_access";

const CoursesPage = () => {
  const [courseAccesses, setCourseAccesses] = useState<CourseAccess[]>([]);

  useEffect(() => {
    const fetchCourseAccesses = async () => {
      try {
        const response = await axios.get<CourseAccess[]>(
          "/api/users/course_accesses"
        );
        setCourseAccesses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseAccesses();
  }, []);

  return (
    <div>
      <h1>Courses Page</h1>
      <ul className={styles.gridList}>
        {courseAccesses.map((courseAccess) => (
          <li key={courseAccess.id}>
            <CourseCard
              headline={courseAccess.attributes.course.course_title}
              lessons={courseAccess.attributes.lesson_count}
              percent_complete={courseAccess.attributes.percent_complete}
              course_id={courseAccess.attributes.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;
