import { CourseShow } from "./course_show";

export type Learner = {
    id: number;
    type: string;
    attributes: {
        accept_terms: boolean;
        accepted_invitation: boolean;
        courses: [{
            id: number;
            archived: boolean;
            course_license_id: number;
            course_title: string;
            is_complete: boolean;
            percent_complete: number;
        }];
        diocese_name: string;
        email: string;
        name: string;
        parish_name: string;
        resend_invitation: boolean;
        role: string;
    };
}