export type Lesson = {
    course_id: number;
    id: number;
    lesson_order: number;
    lesson_title: string;
    lesson_version: number;
    podcast_link: string;
    podcast_title: string;
    questionnaire_embed_code: string;
    video_embed_code: string;
    lesson_content: {
        body: string;
        id: number;
        name: string;
        record_id: number;
        record_type: string;
    }
}