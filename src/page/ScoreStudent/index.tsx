import TitleManager from '@/components/ui/Title';

import { Icon } from '@iconify/react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';

import React, { useState } from 'react';
import TableStudentScore from './Table';
import DropDown from '@/components/ui/Dropdown';
import { ENUM_SCORE_STUDENT } from '@/utils/validations/transcript.validation';
import ListEvaluation from './ListEvaluation';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import { convertListStudentScore } from '@/utils/convertDataTable';
function ScoreStudentPage() {
  const [currentDataRow, setCurrentDataRow] = useState(null);
  const [currentRowSelectId, setCurrentRowSelectId] = useState('');
  const [typeScoreStudent, setTypeScoreStudent] = useState<string>(`${ENUM_SCORE_STUDENT[0]?._id}`);
  const { hanleGetEvalutaionsForScoring, handleGetUnTranscriptStudentsByType } =
    useQueryTranscript();

  const { data, isLoading } = hanleGetEvalutaionsForScoring(typeScoreStudent);

  const { data: listStudent, isLoading: loadingListStudent } =
    handleGetUnTranscriptStudentsByType(typeScoreStudent);

  const handleRowClick = (params: any) => {
    setCurrentDataRow(params.row);
    setCurrentRowSelectId(params.id);
  };

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={2}>
      <Box display={'flex'} gap={10}>
        <TitleManager mb={8} mt={2}>
          Chấm điểm Sinh viên
        </TitleManager>
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

      <Box display='flex' gap={10} pb={4}>
        <Box width={500}>
          <Box display={'flex'} justifyContent={'space-between'}>
            {loadingListStudent ? (
              <Box mx='auto' mt='50%'>
                <CircularProgress />
              </Box>
            ) : (
              <TableStudentScore
                rows={convertListStudentScore(listStudent?.students)}
                currentRowSelectId={currentRowSelectId}
                handleRowClick={handleRowClick}
              />
            )}
          </Box>
        </Box>
        <Paper sx={{ px: 6, width: 'calc(100% - 520px)', pt: 10, height: 640 }} elevation={4}>
          {!currentDataRow ? (
            <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={500}>
              <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
                <Typography color='primary.main' variant='h6' mt={20} fontWeight={600}>
                  Vui lòng Chọn sinh viên trong danh sách sinh viên bên trái để chấm điểm ....
                </Typography>
                <Icon color='#dfdfdf' width={200} icon='icon-park-solid:hand-left' />
              </Box>
            </Box>
          ) : (
            <>
              {/* {isLoading ? (
                <SekeletonUI />
              ) : ( */}
                <ListEvaluation
                  typeScoreStudent={typeScoreStudent}
                  student={currentDataRow}
                  currentRowSelectId={currentRowSelectId}
                  evaluations={data.evaluations}
                />
              {/* )} */}
            </>
          )}
        </Paper>
      </Box>
    </Paper>
  );
}

export default ScoreStudentPage;
