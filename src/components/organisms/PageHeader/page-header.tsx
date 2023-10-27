import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useRouter } from 'next/router'

interface PageHeaderProps {
    headline: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ headline }) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <Box display="flex" alignItems="center" mb={3}>
            <Button onClick={handleBackClick} color="success" style={{ marginRight: '8px' }}>
                {'< Back'}
            </Button>
            <Typography variant="h4">{headline}</Typography>
        </Box>
    );
};

export default PageHeader;
