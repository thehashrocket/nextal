import { useState, useEffect } from 'react';
import { Container, Box, Button, Modal, Stack, Typography, Chip, Divider } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import PageHeader from '@/components/organisms/PageHeader';
import { Learner } from 'src/types/learner';
import LinearProgress from '@mui/material/LinearProgress';

const LearnersPage = () => {
    const [learners, setLearners] = useState<Learner[]>([]);
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalData, setModalData] = useState([]);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'accepted_invite',
            headerName: 'Accepted Invite',
            width: 120,
            renderCell: (params) => (
                <Stack
                    direction={`row`}
                    spacing={5}
                    key={params.row.id}
                >
                    {params.row.accepted_invite ? <Chip color="success" label="Yes" /> : <Chip color="error" label="No" />}
                </Stack>
            )
        },
        { field: 'role', headerName: 'Role', width: 100 },
        {
            field: 'courses',
            headerName: 'Courses',
            width: 400,
            sortable: false,
            renderCell: (params) => (
                <Stack
                    style={{
                        display: 'flex'
                    }}
                    divider={< Divider orientation="horizontal" flexItem />}
                    direction="column"
                    maxWidth={300}
                    justifyContent="space-between"
                    spacing={1}
                    key={params.row.id}>
                    {params.row.courses.map((course: any) => (
                        // Justify space between child elements.

                        <Stack
                            direction='row'
                            justifyContent="space-between"
                            key={course.id}
                            maxWidth={300}
                            style={{ display: 'flex', margin: 'auto 0' }}
                        >
                            {/* Justify space between elements. */}
                            <Typography variant="body2">
                                {course.course_title}
                            </Typography>
                            <Chip label={course.percent_complete} />
                        </Stack>
                    ))}
                </Stack>
            )
        }
    ];

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        const fetchLearners = async () => {
            const response = await fetch('/api/users/learners');
            const data = await response.json();
            setLearners(data.data);
            setRows(data.data.map((learner) => ({
                id: learner.id,
                name: learner.attributes.name,
                parish_name: learner.attributes.parish_name,
                role: learner.attributes.role,
                courses: learner.attributes.courses,
                accepted_invite: learner.attributes.accepted_invitation
            })));
        };
        fetchLearners();
    }, []);

    if (!learners) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <PageHeader headline="Learners You Have Invited" />
            <DataGrid
                getRowHeight={() => 'auto'}
                pageSizeOptions={[5, 10, 25]}
                slots={{
                    loadingOverlay: LinearProgress,
                }}
                loading={rows.length === 0}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'name', sort: 'asc' }, { field: 'parish_name', sort: 'desc' }]
                    },
                    pagination: { paginationModel: { page: 0, pageSize: 10 } }
                }}
                rows={rows}
                columns={columns}
                hideFooterSelectedRowCount={true}
            />
        </Container >
    );
};

export default LearnersPage;
