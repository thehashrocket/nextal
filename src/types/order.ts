export type Order = {
    id: number;
    attributes: {
        web_order_number: string;
        order_date: string;
        order_total: number;
        status: string;
        parish_name: string;
        name: string;
        has_license: boolean;
    }
}