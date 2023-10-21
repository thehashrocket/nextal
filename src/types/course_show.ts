// This is used to show an individual Course on /courses/[:id]

import { Course } from "./course";
import { CourseAccessLessonStatus } from "./course_access_lesson_status";
import { CourseDescription } from "./course_description";
import { Lesson } from "./lesson";

export type CourseShow = {
    course_progress: number;
    course_title: string;
    lessons: [
        {
            lesson_id: number;
            lesson_title: string;
            course_access_id: number;
            current_lesson: boolean;
            course_complete: boolean;
            course_access_lesson_status_id: number;
        }
    ];
}