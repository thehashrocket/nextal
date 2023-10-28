import { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { Order } from 'src/types/order';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();
    const [rows, setRows] = useState<GridRowsProp>([]);

    const handleShowOrder = (orderId: number) => {
        router.push(`/orders/${orderId}`);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'web_order_number', headerName: 'Web Order Number', width: 200 },
        { field: 'order_date', headerName: 'Order Date', width: 150 },
        { field: 'order_total', headerName: 'Order Total', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'parish_name', headerName: 'Parish', width: 150 },
        { field: 'name', headerName: 'Customer', width: 150 },
        { field: 'has_license', headerName: 'Has License', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => handleShowOrder(params.row.id)}>Show Order</button>
            ),
        },
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/users/sales_orders');
            const data = await response.json();
            setOrders(data.data);
            setRows(data.data.map((order: Order) => ({
                id: order.id,
                web_order_number: order.attributes.web_order_number,
                order_date: order.attributes.order_date,
                order_total: order.attributes.order_total,
                status: order.attributes.status,
                parish_name: order.attributes.parish_name,
                name: order.attributes.name,
                has_license: order.attributes.has_license,
            })))
        };
        fetchOrders();
    }, []);



    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{
                    loadingOverlay: LinearProgress,
                }}
                loading={rows.length === 0}
                hideFooterSelectedRowCount={true}
                pageSizeOptions={[5, 10, 25]}
            />
        </div>
    );
};

export default OrdersPage;
