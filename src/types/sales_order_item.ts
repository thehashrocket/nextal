export type SalesOrderItem = {
    id: number;
    attributes: {
        has_license: boolean;
        item_name: string;
        item_tax_total: number;
        item_total: number;
        quantity: number;
        regular_price: number;
        web_line_item_id: number;
    }
}