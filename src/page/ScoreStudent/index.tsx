import TitleManager from '@/components/ui/Title';

import { Icon } from '@iconify/react';
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import TableStudentScore from './Table';
import DropDown from '@/components/ui/Dropdown';
import { checkTypeEvaluation, ENUM_SCORE_STUDENT } from '@/utils/validations/transcript.validation';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import { convertListGroupStudentScore } from '@/utils/convertDataTable';
import TranscriptGroupStudent from './ChangeTranscriptsGroupSection';

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
    <Paper sx={{ py: 10, px: 10 }} elevation={2}>
      <Box>
        <Box mb={10} display={'flex'} gap={10}>
          <TitleManager icon='quill:list' mb={8} mt={2}>
            Chấm điểm Sinh viên
          </TitleManager>
          <Box width={180}>
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
      </Box>
      <Box display='flex' gap={10} pb={4}>
        <Box
          sx={{
            position: 'static !important',
            top: 0,
          }}
          width={420}
        >
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
        <Box sx={{ width: 'calc(100% - 400px)', minHeight: 300 }}>
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
              <TranscriptGroupStudent
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
