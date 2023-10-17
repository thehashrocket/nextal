import { Course } from "./course";
import { CourseAccessLessonStatus } from "./course_access_lesson_status";
import { CourseDescription } from "./course_description";
import { Lesson } from "./lesson";

export type CourseAccess = {
    id: string;
    type: string;
    attributes: {
        access_token: string;
        archived: boolean;
        course: Course
        course_description: CourseDescription;
        course_license_id: number;
        course_status: string;
        course_title: string;
        id: number;
        lessons: [Lesson];
        lesson_count: number;
        course_access_lesson_statuses: [CourseAccessLessonStatus];
        next_lesson_status: CourseAccessLessonStatus
        percent_complete: number;
        seats: number;
    }
}