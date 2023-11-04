import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { Order } from 'src/types/order';
import { SalesOrderItem } from 'src/types/sales_order_item';
import { LinearProgress } from '@mui/material';
import PageHeader from '@/components/organisms/PageHeader';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';

const SalesOrderPage = () => {
    const router = useRouter();
    const [rows, setRows] = useState<GridRowsProp>([])
    const { sales_order_id } = router.query;
    const [salesOrder, setSalesOrder] = useState<Order>(null);
    const [salesOrderItems, setSalesOrderItems] = useState<SalesOrderItem[]>([]);

    const handleShowLicense = (salesOrderItemId: number) => {
        router.push(`/course_licenses/${salesOrderItemId}`);
    }
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
                item_tax_total: '$' + item.attributes.item_tax_total,
                item_total: '$' + item.attributes.item_total,
                quantity: item.attributes.quantity,
                regular_price: '$' + item.attributes.regular_price,
                has_license: item.attributes.has_license,
                actions: item.attributes.has_license
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
                    <Typography variant="h5"><strong>Sales Order #:</strong> {salesOrder.attributes.web_order_number}</Typography>
                    <Typography variant="body1"><strong>Customer:</strong> {salesOrder.attributes.name}</Typography>
                </div>
                <div>
                    <Typography variant="body1"><strong>Order Total:</strong> ${salesOrder.attributes.order_total}</Typography>
                    <Typography variant="body1"><strong>Order Date:</strong> {new Date(salesOrder.attributes.order_date).toLocaleDateString()}</Typography>
                </div>
            </Box>
            <Divider orientation='horizontal' style={{ margin: '15px 0' }} />
            <Typography variant='h5'>Sales Order Items</Typography>
            <DataGrid
                columns={[
                    { field: 'item_name', headerName: 'Item Name', width: 500 },
                    { field: 'quantity', headerName: 'Quantity', width: 100 },
                    { field: 'regular_price', headerName: 'Regular Price', width: 120 },
                    { field: 'item_total', headerName: 'Item Total', width: 100 },
                    { field: 'item_tax_total', headerName: 'Item Tax Total', width: 130 },
                    {
                        field: 'actions',
                        headerName: 'Actions',
                        width: 200,
                        renderCell: (params) => (
                            (params.row.has_license) ? <Button onClick={() => handleShowLicense(params.row.id)}>View License</Button> : (<div></div>
                            )),
                    }
                ]}
                rows={rows}
                loading={rows.length === 0}
                slots={{
                    loadingOverlay: LinearProgress,
                }}
                autoHeight
                disableColumnMenu />
            <Stack
                direction="column"
                spacing={2}
                style={{ marginTop: '15px' }}
                divider={<Divider orientation="horizontal" flexItem />}
                justifyContent={'flex-end'}
            >
                <div>
                    <Typography variant="body2"><strong>Subtotal:</strong> ${salesOrder.attributes.sub_total}</Typography>
                </div>
                <div>
                    <Typography variant="body2"><strong>Tax Total:</strong> ${salesOrder.attributes.tax_total}</Typography>
                </div>
                <div>
                    <Typography variant="body2"><strong>Shipping Total:</strong> ${salesOrder.attributes.shipping_total}</Typography>
                </div>
                <div>
                    <Typography variant="body2"><strong>Discount Total:</strong> ${salesOrder.attributes.discount_total}</Typography>
                </div>
                <div>
                    <Typography variant="body2"><strong>Order Total:</strong> ${salesOrder.attributes.order_total}</Typography>
                </div>
            </Stack>
        </Container>
    );
};

export default SalesOrderPage;
