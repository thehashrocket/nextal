import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Table, Typography } from '@mui/material';
import { Order } from 'src/types/order';
import { SalesOrderItem } from 'src/types/sales_order_item';
import PageHeader from '@/components/organisms/PageHeader';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';

const SalesOrderPage = () => {
    const router = useRouter();
    const [rows, setRows] = useState<GridRowsProp>([])
    const { sales_order_id } = router.query;
    const [salesOrder, setSalesOrder] = useState<Order>(null);
    const [salesOrderItems, setSalesOrderItems] = useState<SalesOrderItem[]>([]);

    useEffect(() => {
        const fetchSalesOrder = async () => {
            const res = await fetch(`/api/users/sales_orders/${sales_order_id}`);
            const data = await res.json();
            console.log('data', data.data.sales_order_items.data);

            setSalesOrder(data.data.sales_order.data);
            setSalesOrderItems(
                data.data.sales_order_items.data.map((item: SalesOrderItem) => ({
                    id: item.id,
                    item_name: item.attributes.item_name,
                    item_tax_total: item.attributes.item_tax_total,
                    item_total: item.attributes.item_total,
                    quantity: item.attributes.quantity,
                    regular_price: item.attributes.regular_price,
                    has_license: item.attributes.has_license,
                }))
            );

            setRows(data.data.sales_order_items.data.map((item: SalesOrderItem) => ({
                id: item.id,
                item_name: item.attributes.item_name,
                item_tax_total: item.attributes.item_tax_total,
                item_total: item.attributes.item_total,
                quantity: item.attributes.quantity,
                regular_price: item.attributes.regular_price,
                has_license: item.attributes.has_license,
                actions: (item.attributes.has_license) ? <Button>View License</Button> : ''
            })))
        };

        if (sales_order_id) {
            fetchSalesOrder();
        }
    }, [sales_order_id]);

    if (!salesOrder) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <PageHeader headline="Sales Order" />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="h5">Sales Order #{salesOrder.id}</Typography>
                    <Typography variant="body1">Customer: {salesOrder.attributes.name}</Typography>
                </div>
                <div>
                    <Typography variant="body1">Order Total: ${salesOrder.attributes.order_total}</Typography>
                    <Typography variant="body1">Order Date: {new Date(salesOrder.attributes.order_date).toLocaleDateString()}</Typography>
                </div>
            </Box>

            <h2>Sales Order Items</h2>
            <DataGrid
                columns={[
                    { field: 'item_name', headerName: 'Item Name', width: 200 },
                    { field: 'quantity', headerName: 'Quantity', width: 200 },
                    { field: 'regular_price', headerName: 'Regular Price', width: 200 },
                    { field: 'item_total', headerName: 'Item Total', width: 200 },
                    { field: 'item_tax_total', headerName: 'Item Tax Total', width: 200 },
                    { field: 'actions', headerName: 'Actions', width: 200 }
                ]}
                rows={salesOrderItems}
                autoHeight
                disableColumnMenu />
        </Container>
    );
};

export default SalesOrderPage;
