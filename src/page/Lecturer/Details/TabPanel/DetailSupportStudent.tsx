import { TabPanel, TabPanelProps } from '@mui/lab';
import React, { useEffect } from 'react';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent.js';
import { useLocation } from 'react-router-dom';
import TableDetailGroupStudentOfLecturer from './TableSupportStudent.tsx';
import SekeletonUI from '@/components/ui/Sekeleton/index.jsx';

function DetailSupportStudent(props: TabPanelProps) {
  const { value } = props;
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const lecturerId = `${current[current.length - 1]}`;

  const { handleGetGroupStudentByLecturerByTerm } = useGroupStudent();
  const { data, isFetching, isLoading, refetch } =
    handleGetGroupStudentByLecturerByTerm(lecturerId);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <TabPanel value={value} sx={{ my: 4 }}>
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <TableDetailGroupStudentOfLecturer rows={data ? data.groupStudents : []} />
      )}
    </TabPanel>
  );
}

export default DetailSupportStudent;
