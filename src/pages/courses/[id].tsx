import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { CourseAccess } from 'src/types/course_access';
import { LinearProgress, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
interface CourseProps {
    id: string;
}

export default function Course({ id }: CourseProps) {
    const params = useParams();

    const [courseAccess, setCourseAccess] = useState<CourseAccess | null>(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(`/api/users/course_accesses/${params['id']}`);
                setCourseAccess(response.data);
                console.log('response.data', response.data)
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
        <div>
            <h1>{courseAccess.attributes.course_title}</h1>
            <LinearProgress variant="determinate" value={courseAccess.attributes.percent_complete} />
            <List>
                {courseAccess.attributes.course_access_lesson_statuses.map((lesson_status) => (
                    <ListItem key={lesson_status.id}>
                        <Link href={`/courses/${params['id']}/lessons/${lesson_status.id}`}>
                            <ListItemText primary={lesson_status.lesson.lesson_title} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
