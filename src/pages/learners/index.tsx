import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Learner {
    id: number;
    name: string;
    courses: string[];
}

const LearnersPage = () => {
    const [learners, setLearners] = useState<Learner[]>([]);

    useEffect(() => {
        const fetchLearners = async () => {
            const response = await fetch('/api/users/learners');
            const data = await response.json();
            setLearners(data);
        };
        fetchLearners();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Courses</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {learners.map((learner) => (
                        <TableRow key={learner.id}>
                            <TableCell>{learner.name}</TableCell>
                            <TableCell>{learner.courses.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LearnersPage;
