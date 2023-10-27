import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import PageHeader from '@/components/organisms/PageHeader';
import { Learner } from 'src/types/learner';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const LearnersPage = () => {
    const [learners, setLearners] = useState<Learner[]>([]);
    const [rows, setRows] = useState<GridRowsProp>([]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'parish_name', headerName: 'Parish Name', width: 200 },
    ];

    useEffect(() => {
        const fetchLearners = async () => {
            const response = await fetch('/api/users/learners');
            const data = await response.json();
            setLearners(data.data);
            setRows(data.data.map((learner) => ({ id: learner.id, name: learner.attributes.name, parish_name: learner.attributes.parish_name })));
            console.log('data', data)
        };
        fetchLearners();
    }, []);

    if (!learners) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <PageHeader headline="Learners You Have Invited" />
            <div style={{ height: '75%', width: '100%' }}>
                <DataGrid
                    initialState={{ sorting: { sortModel: [{ field: 'name', sort: 'desc' }, { field: 'parish_name', sort: 'desc' }] } }}
                    rows={rows}
                    columns={columns}
                />
            </div>
        </Container>
    );
};

export default LearnersPage;
