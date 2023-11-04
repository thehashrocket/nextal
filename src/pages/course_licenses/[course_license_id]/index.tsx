import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, List, ListItem, ListItemText, Divider, Stack, LinearProgress, Button } from '@mui/material';
import axios from 'axios';
import PageHeader from '@/components/organisms/PageHeader';
import { CourseLicense } from 'src/types/course_license';
import { Learner } from 'src/types/learner';
import ProgressBar from '@/components/atoms/progress-bar';
import { DeleteOutline } from '@mui/icons-material';

export default function CourseLicensePage() {
    const router = useRouter();
    const { course_license_id } = router.query;
    const [courseLicense, setCourseLicense] = useState<CourseLicense | null>(null);
    const [learners, setLearners] = useState<Learner[]>([]);

    useEffect(() => {
        if (course_license_id) {
            axios.get(`/api/users/course_licenses/${course_license_id}`).then((response) => {
                setCourseLicense(response.data.data.course_license.data);
                setLearners(response.data.data.learners.data);
            });
        }
    }, [course_license_id]);

    const archiveLicense = (learnerId: number) => () => {
        axios.get(`/api/users/course_licenses/${course_license_id}/archive`).then((response) => {
            setLearners(response.data.data.learners.data);
        });
    }

    if (!courseLicense) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <PageHeader headline="Course License" />
            <Typography variant="h5" component="h1" gutterBottom>
                Owner: {courseLicense.attributes.user_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Course:</strong> {courseLicense.attributes.course_title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Total Quantity:</strong> {courseLicense.attributes.total_quantity}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Quantity Available:</strong> {courseLicense.attributes.quantity_available}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Quantity Used:</strong> {courseLicense.attributes.quantity_used}
            </Typography>

            <Divider style={{ margin: '15px 0' }} />
            <Typography variant="h5" component="h2" gutterBottom>
                Learners:
            </Typography>
            <Divider style={{ margin: '15px 0' }} />

            {learners ? (
                <List>
                    {learners.map((learner) => (
                        <ListItem key={learner.id}>
                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        size='small'
                                        startIcon={<DeleteOutline />}
                                        variant="outlined"
                                        color="warning"
                                        onClick={archiveLicense(learner.id)} >
                                        {
                                            learner.attributes.courses.some((course) => course.archived == true) ? 'UnArchive' : 'Archive'
                                        }
                                    </Button>
                                    {learner.attributes.courses.map((course) => (
                                        <Typography key={course.id} variant="body1" gutterBottom>
                                            <strong>Course:</strong> {course.id}
                                        </Typography>
                                    ))
                                    }
                                    <Typography variant="body1" gutterBottom>
                                        <strong>License:</strong> {learner.attributes.name} - {learner.attributes.email}
                                    </Typography>
                                </Stack>
                                {learner.attributes.courses.map((course) => (
                                    <LinearProgress variant="determinate" value={course.percent_complete} />
                                ))}
                            </Stack>


                        </ListItem>
                    ))}
                </List>
            ) : (
                <div>Loading learners...</div>
            )}

        </Container>
    );
}
