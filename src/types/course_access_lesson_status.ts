import { Lesson } from "./lesson";

export type CourseAccessLessonStatus = {
    id: number;
    course_access_id: number;
    lesson_id: number;
    complete: boolean;
    current_lesson: boolean;
    lesson_order: number;
    lesson_release_time: string;
    lesson: Lesson;
}