import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import TableStudentScore from './Table';
import DropDown from '@/components/ui/Dropdown';
import { checkTypeEvaluation, ENUM_SCORE_STUDENT } from '@/utils/validations/transcript.validation';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import { convertListGroupStudentScore } from '@/utils/convertDataTable';
import TranscriptOfGroupStudent from './Transcript';

function ScoreStudentPage() {
  const [currentDataRow, setCurrentDataRow] = useState(null);
  const [currentRowSelectId, setCurrentRowSelectId] = useState('');
  const [typeScoreStudent, setTypeScoreStudent] = useState<string>(`${ENUM_SCORE_STUDENT[0]?._id}`);
  const { hanleGetEvalutaionsForScoring, handleGetUnTranscriptGroupStudentsByType } =
    useQueryTranscript();
  const { data, isSuccess } = hanleGetEvalutaionsForScoring(checkTypeEvaluation(typeScoreStudent));
  const { data: groups, isLoading: loadingGrStudent } =
    handleGetUnTranscriptGroupStudentsByType(typeScoreStudent);
  const handleRowClick = (params: any) => {
    setCurrentDataRow(params.row);
    setCurrentRowSelectId(params.id);
  };
  return (
    <Paper sx={{ py: 4, px: 5 }} elevation={0}>
      <Box display='flex' gap={5} pb={4}>
        <Box
          sx={{
            position: 'static !important',
            top: 0,
          }}
          width={370}
        >
          <Box
            mb={4}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={10}
          >
            <TitleManager>Nhóm sinh viên </TitleManager>
            <Box width={170}>
              <DropDown
                onChange={(e: any) => {
                  setTypeScoreStudent(e.target.value);
                  setCurrentRowSelectId('');
                  setCurrentDataRow(null);
                }}
                value={typeScoreStudent}
                options={ENUM_SCORE_STUDENT}
              />
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            {loadingGrStudent ? (
              <Box mx='auto' mt='50%'>
                <CircularProgress />
              </Box>
            ) : (
              <TableStudentScore
                rows={convertListGroupStudentScore(groups?.groupStudents)}
                currentRowSelectId={currentRowSelectId}
                handleRowClick={handleRowClick}
              />
            )}
          </Box>
        </Box>
        <Box sx={{ width: 'calc(100% - 150px)', minHeight: 570 }}>
          {!currentDataRow ? (
            <Box display={'flex'} flexDirection={'column'} height={570}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={5}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Icon color='#dfdfdf' width={150} icon='icon-park-solid:hand-left' />
                <Typography color='grey.600' variant='h5' mt={20} fontWeight={500}>
                  Chọn nhóm sinh viên muốn chấm điểm ở bảng dữ liệu bên trái.
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <TranscriptOfGroupStudent
                groupStudent={currentDataRow}
                evaluations={isSuccess ? data.evaluations : []}
                transcriptType={typeScoreStudent}
              />
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default ScoreStudentPage;
