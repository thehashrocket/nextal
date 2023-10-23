import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Container, LinearProgress, List, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { CourseAccessLessonStatus } from 'src/types/course_access_lesson_status';
import { Lesson } from 'src/types/lesson';
import { updateCookie } from 'src/utils/updateCookie';
import PageHeader from '@/components/organisms/PageHeader';
interface CourseProps {
    id: string;
}

// This component loads an individual lesson, it is called by the Course page.
export default function Lesson({ id }: CourseProps) {
    const params = useParams();

    const [courseAccessLessonStatus, setCourseAccessLessonStatus] = useState<CourseAccessLessonStatus | null>(null);
    const [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(`/api/users/course_access_lesson_statuses/${params['courseAccessLessonStatusId']}`);
                setCourseAccessLessonStatus(response.data.data.attributes);
                updateCookie('test', response.data.headers);
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

            {/* if lesson.video_embed_code has a value, then load the Videp Player */}

            {lesson.video_embed_code && (
                <>
                    <div dangerouslySetInnerHTML={{ __html: lesson.before_video_content.body }} style={{ marginTop: '16px' }} />
                    <div dangerouslySetInnerHTML={{ __html: lesson.video_embed_code }} style={{ marginTop: '16px' }} />
                    <div dangerouslySetInnerHTML={{ __html: lesson.after_video_content.body }} style={{ marginTop: '16px' }} />
                </>
            )}

            {/* if lesson.video_embed_code is null, then load the lesson content */}

            {!lesson.video_embed_code && (
                <div dangerouslySetInnerHTML={{ __html: lesson.lesson_content.body }} style={{ marginTop: '16px' }} />
            )}

        </Container>
    );
}
