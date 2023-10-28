import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SalesOrderPage = () => {
    const router = useRouter();
    const { sales_order_id } = router.query;
    const [salesOrder, setSalesOrder] = useState(null);

    useEffect(() => {
        const fetchSalesOrder = async () => {
            const res = await fetch(`/api/sales-orders/${sales_order_id}`);
            const data = await res.json();
            setSalesOrder(data);
        };

        if (sales_order_id) {
            fetchSalesOrder();
        }
    }, [sales_order_id]);

    if (!salesOrder) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Sales Order #{salesOrder.id}</h1>
            <p>Customer: {salesOrder.customer}</p>
            <p>Order Total: ${salesOrder.total}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default SalesOrderPage;
