import { Box } from '@mui/material';
import React from 'react';
import TableStudentInGroup from './Table';

function StudentInGroupPage({ members }: any) {
  return (
    <Box>
      <TableStudentInGroup members={members} />
    </Box>
  );
}

export default StudentInGroupPage;
