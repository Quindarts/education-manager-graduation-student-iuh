import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import TableScoreManagement from './Table';
import TitleManager from '@/components/ui/Title';
import DropDown from '@/components/ui/Dropdown';
const ENUM_SCORE_STUDENT = [
  {
    name: 'Chấm Hướng dẫn',
    _id: 'ADVISOR',
  },
  {
    name: 'Chấm Phản biện',
    _id: 'REVIEWER',
  },
  {
    name: 'Chấm Hội đồng / Poster',
    _id: 'REPORT',
  },
];
function TranscriptOfAllStudents() {
  const [typeScoreStudent, setTypeScoreStudent] = useState<string>(`${ENUM_SCORE_STUDENT[0]?._id}`);

  const handleChangeTypeScoreStudent = (typeScoreStudent: string) => {
    if (typeScoreStudent === 'REPORT_COUNCIL' || typeScoreStudent === 'REPORT_POSTER') {
      setTypeScoreStudent('REPORT');
    } else setTypeScoreStudent(typeScoreStudent);
  };

  return (
    <Paper elevation={0} sx={{ px: 2, py: 4 }}>
      <Box mb={4} display={'flex'} alignItems={'center'} gap={2}>
        <TitleManager sx={{ mx: 4 }}>Bảng điểm tất cả sinh viên </TitleManager>
        <Box width={170}>
          <DropDown
            onChange={(e: any) => {
              handleChangeTypeScoreStudent(e.target.value);
            }}
            value={typeScoreStudent}
            options={ENUM_SCORE_STUDENT}
          />
        </Box>
      </Box>
      <Box>
        <TableScoreManagement typeScoreStudent={typeScoreStudent} />
      </Box>
    </Paper>
  );
}

export default TranscriptOfAllStudents;
