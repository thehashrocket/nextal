import { CourseAccess } from "./course_access";

export type CourseLicense = {
    id: number;
    attributes: {
        access_token: string;
        archived: boolean;
        course_accesses: CourseAccess[];
        course_id: number;
        course_title: string;
        created_at: string;
        id: number;
        quantity_available: number;
        quantity_used: number;
        sales_order_item_id: number;
        total_quantity: number;
        user_name: string;
        user_id: number;
    }
}