export type VideoEmbed = {
    after_podcast_link: boolean;
    id: number;
    lesson_id: number;
    play_order: number;
    title: string;
    video_embed_code: string;
    after_text: {
        body: string;
        id: number;
        name: string;
        record_id: number;
        record_type: string;
    }
    before_text: {
        body: string;
        id: number;
        name: string;
        record_id: number;
        record_type: string;
    }
}