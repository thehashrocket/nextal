import { Lesson } from "./lesson";

export type CourseAccessLessonStatus = {
    complete: boolean;
    course_access_id: number;
    current_lesson: boolean;
    course_title: string;
    deleted_at: string;
    id: number;
    lesson: Lesson;
    lesson_id: number;
    lesson_order: number;
    lesson_release_time: string;
}