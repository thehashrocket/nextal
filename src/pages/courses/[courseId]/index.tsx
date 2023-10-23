import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { CourseShow } from 'src/types/course_show';
import { LinearProgress, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import Check from '@mui/icons-material/Check';
import { Lesson } from 'src/types/lesson';
import { updateCookie } from 'src/utils/updateCookie';
import Container from "@mui/material/Container";
import PageHeader from '@/components/organisms/PageHeader';

interface CourseProps {
    id: string;
}
// This component loads an individual Course and the links to lessons that are a part of that course.
export default function Course({ id }: CourseProps) {
    const params = useParams();

    const [courseAccess, setCourseAccess] = useState<CourseShow | null>(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(`/api/users/course_accesses/${params['courseId']}`);
                setCourseAccess(response.data.data);
                updateCookie('test', response.data.headers);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCourse();
    }, [id, params]);

    if (!courseAccess) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <PageHeader headline={courseAccess.course_title} />
            <LinearProgress variant="determinate" value={courseAccess.course_progress} />
            <List>
                {courseAccess.lessons.map((lesson) => (
                    <ListItem key={lesson.lesson_id}>
                        <ListItemIcon>
                            {lesson.course_complete && (<Check></Check>)}
                        </ListItemIcon>
                        <Link href={`/courses/${params['courseId']}/lessons/${lesson.course_access_lesson_status_id}`}>
                            <ListItemText primary={lesson.lesson_title} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
