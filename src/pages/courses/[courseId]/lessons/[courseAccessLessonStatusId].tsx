import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Alert, BottomNavigation, BottomNavigationAction, Box, Container, Divider, LinearProgress, List, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { CourseAccessLessonStatus } from 'src/types/course_access_lesson_status';
import { Lesson } from 'src/types/lesson';
import { updateCookie } from 'src/utils/updateCookie';
import PageHeader from '@/components/organisms/PageHeader';
import ReactPlayer from 'react-player';
import Snackbar from '@mui/material/Snackbar';
import { ArrowBack, ArrowForward, Check } from '@mui/icons-material';
import { useRouter } from "next/router";
interface CourseProps {
    id: string;
}

// This component loads an individual lesson, it is called by the Course page.
export default function Lesson({ id }: CourseProps) {
    const params = useParams();
    const router = useRouter();
    const [bottomNavValue, setBottomNavValue] = useState(0);
    const [open, setOpen] = useState(false);

    const [courseAccessLessonStatus, setCourseAccessLessonStatus] = useState<CourseAccessLessonStatus | null>(null);
    const [lesson, setLesson] = useState<Lesson | null>(null);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleNavChange = (event: React.SyntheticEvent, newValue: string) => {

        if (newValue === 'next') {
            router.push(`/courses/${params['courseId']}/lessons/${courseAccessLessonStatus.next_course_access_lesson_status_id}`);
        } else if (newValue === 'previous') {
            router.push(`/courses/${params['courseId']}/lessons/${courseAccessLessonStatus.previous_course_access_lesson_status_id}`);
        } else {
            // Complete
            axios.get(`/api/users/course_access_lesson_statuses/${params['courseAccessLessonStatusId']}/complete`)
                .then((response) => {
                    updateCookie('currentCourseAccessLessonStatusId', response.data.data.attributes.id);
                    setOpen(true)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(`/api/users/course_access_lesson_statuses/${params['courseAccessLessonStatusId']}`);
                setCourseAccessLessonStatus(response.data.data.attributes);
                setLesson(response.data.included[0].attributes);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCourse();
    }, [id, params]);

    if (!courseAccessLessonStatus) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <PageHeader headline={courseAccessLessonStatus.course_title} />
            <Typography variant="h5">{courseAccessLessonStatus.lesson.lesson_title}</Typography>

            {lesson.has_video && (
                <Box>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <div dangerouslySetInnerHTML={{ __html: lesson.before_video_content.body }} style={{ marginTop: '16px' }} />
                        </Grid>
                        <Grid xs={12}>
                            <Box style={{ position: 'relative', paddingTop: '56.25%' }} >
                                <ReactPlayer style={{ position: 'absolute', top: 0, left: 0 }} url={lesson.video_url} controls={true} width="100%" />
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <div dangerouslySetInnerHTML={{ __html: lesson.after_video_content.body }} style={{ marginTop: '16px' }} />
                        </Grid>
                    </Grid>
                </Box>
            )}

            {!lesson.has_video && (
                <div dangerouslySetInnerHTML={{ __html: lesson.lesson_content.body }} style={{ marginTop: '16px' }} />
            )}
            <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    onChange={handleNavChange}
                >
                    <BottomNavigationAction value='previous' label="Previous" icon={<ArrowBack />} />
                    <BottomNavigationAction label="Complete" icon={<Check />} />
                    <BottomNavigationAction value='next' label="Next" icon={<ArrowForward />} />
                </BottomNavigation>
            </Paper>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </Container>
    );
}
