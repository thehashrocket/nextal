import { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PageHeader from '@/components/organisms/PageHeader';

interface Learner {
    id: number;
    type: string;
    attributes: {
        name: string;
        accept_terms: boolean;
        parish_name: string;
        role: string;
        diocese_name: string;
    };
}

const LearnersPage = () => {
    const [learners, setLearners] = useState<Learner[]>([]);

    useEffect(() => {
        const fetchLearners = async () => {
            const response = await fetch('/api/users/learners');
            const data = await response.json();
            setLearners(data.data);
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Parish Name</TableCell>
                            <TableCell>Courses</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {learners.map((learner) => (
                            <TableRow key={learner.id}>
                                <TableCell>{learner.attributes.name}</TableCell>
                                <TableCell>{learner.attributes.parish_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default LearnersPage;
