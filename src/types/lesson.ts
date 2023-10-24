import { VideoContent } from "./video_content";
import { VideoEmbed } from "./video_embed";

export type Lesson = {
    after_video_content: VideoContent;
    before_video_content: VideoContent;
    course_id: number;
    course_title: string;
    has_questionnaire: boolean;
    has_video: boolean;
    id: number;
    lesson_order: number;
    lesson_title: string;
    lesson_version: number;
    podcast_description: {
        body: string;
        id: number;
        name: string;
        record_id: number;
        record_type: string;
    };
    podcast_link: string;
    podcast_title: string;
    pretty_release_date: string;
    pretty_release_time: string;
    questionnaire_embed_code: string;
    video_embed_code: string;
    lesson_content: {
        body: string;
        id: number;
        name: string;
        record_id: number;
        record_type: string;
    }
    video_embeds: [VideoEmbed]
    video_url: string;
}