export type Order = {
    id: number;
    attributes: {
        discount_total: number;
        has_license: boolean;
        name: string;
        order_date: string;
        order_total: number;
        parish_name: string;
        refund_total: number;
        shipping_total: number;
        status: string;
        sub_total: number;
        tax_total: number;
        web_order_number: string;

    }
}