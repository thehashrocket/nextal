import React from 'react';
import { Box, Typography, Link } from '@mui/material';
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
            <Link onClick={handleBackClick} color="textSecondary" style={{ marginRight: '8px' }}>
                {'< Back'}
            </Link>
            <Typography variant="h4">{headline}</Typography>
        </Box>
    );
};

export default PageHeader;
