import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { LinearProgress, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { CourseAccessLessonStatus } from 'src/types/course_access_lesson_status';
import { Lesson } from 'src/types/lesson';
import { updateCookie } from 'src/utils/updateCookie';
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
                setCourseAccessLessonStatus(response.data.data.data.attributes);
                updateCookie('test', response.data.headers);
                setLesson(response.data.data.included[0].attributes);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCourse();
    }, [id, params]);

    if (!courseAccessLessonStatus) {
        console.log('courseAccessLessonStatus', courseAccessLessonStatus);
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{courseAccessLessonStatus.course_title}</h1>
            <h3>{courseAccessLessonStatus.lesson.lesson_title}</h3>

        </div>
    );
}
