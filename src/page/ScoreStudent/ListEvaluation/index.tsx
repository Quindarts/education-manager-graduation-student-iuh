import ScoreInput from '@/components/ui/ScoreInput';
import SekeletonUI from '@/components/ui/Sekeleton';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import { Icon } from '@iconify/react';

import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

var checkIsExistTranscripts = (evalu: any, dataResponse: any) => {
  var newEvaluation: any = [];
  var listScore: any = [];
  if (dataResponse !== undefined && dataResponse.length <= 0) {
    newEvaluation = evalu;
  } else {
    for (let i = 0; i < evalu.length; i++) {
      let currentEvl = evalu[i];
      let flag = false;
      dataResponse.map((myEvl: any) => {
        if (currentEvl.id === myEvl.evaluationId) {
          newEvaluation.push({
            ...currentEvl,
            isExist: true,
            transcriptId: myEvl.id,
            oldScore: myEvl.score,
          });
          listScore.push(myEvl.score);
          flag = true;
        }
      });
      if (!flag) newEvaluation.push({ ...currentEvl });
    }
  }

  const total = caculateOldScore(listScore);
  return { newEvaluation, total };
};
const caculateOldScore = (listScore: any) => {
  return listScore.reduce((total: number, value: number) => total + value, 0);
};

type InitTranscriptsValue = {
  id: string;
  isExist: boolean;
  name: string;
  oldScore: number;
  scoreMax: number;
  transcriptId: string;
  transcripts: any;
};
function ListEvaluation(props: any) {
  const { evaluations, student, typeScoreStudent, currentRowSelectId } = props;
  const { handleGetTranscriptsByTypeEvaluation } = useQueryTranscript();

  const {
    data: dataTranscripts,
    isLoading: loadingTranscriptStudent,
    isSuccess,
    isFetching,
  } = handleGetTranscriptsByTypeEvaluation(typeScoreStudent, currentRowSelectId);

  const [initTranscripts, setInitTranscripts] = useState({
    newEvaluation: [],
    total: 0,
  });

  const { onCreateTranscript, onUpdateTranscript } = useQueryTranscript();

  const { mutate: createTranscript, isSuccess: successCreate } = onCreateTranscript(
    student.id,
    typeScoreStudent,
  );
  const { mutate: updateTranscript, isSuccess: successUpdate } = onUpdateTranscript(
    student.id,
    typeScoreStudent,
  );
  const handleChangeCurrentTranscripts = (
    score: number,
    value: string,
    transcriptId?: string,
    isExistOldScore?: boolean,
  ) => {
    if (isExistOldScore === false || isExistOldScore === undefined) {
      createTranscript({
        studentId: student.id,
        evaluationId: value,
        score,
      });
    } else {
      updateTranscript({
        id: `${transcriptId}`,
        score,
      });
    }
  };

  const maxScore = evaluations
    .map((evl: any) => evl.scoreMax)
    .reduce((score1: number, score2: number) => score1 + score2, 0);

  useEffect(() => {
    setInitTranscripts({ newEvaluation: [], total: 0 });

    if (dataTranscripts !== undefined) {
      setInitTranscripts(checkIsExistTranscripts(evaluations, dataTranscripts?.transcripts));
    }
  }, [isSuccess, successCreate, isFetching, successUpdate, currentRowSelectId]);
  return (
    <>
      {loadingTranscriptStudent || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            pb={4}
            borderBottom='2px solid #002f5a'
          >
            <Box>
              <Typography color='dark.main' variant='h6' fontWeight={'bold'}>
                Tên sinh viên: {student?.fullName}
              </Typography>
              <Typography color='dark.main' variant='body1' fontWeight={600}>
                Nhóm Dề tài 1
              </Typography>
            </Box>

            <Box>
              <Typography textAlign={'start'} mr={20} color={'dark'} variant='h6'>
                *Tổng điểm:
                <Typography color='red' variant='h5' fontWeight={500} component={'span'}>
                  {' '}
                  {initTranscripts.total} / {maxScore}{' '}
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ overflowY: 'auto', height: 500 }}
            my={10}
            display={'flex'}
            px={2}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={8}
          >
            {initTranscripts.newEvaluation.map((evaluation: any, key: number) => (
              <Box width={'calc(50% - 12px)'}>
                <ScoreInput
                  numberCLO={key + 1}
                  handleChangeCurrentTranscripts={handleChangeCurrentTranscripts}
                  value={evaluation.id}
                  name={evaluation?.name}
                  studentId={currentRowSelectId}
                  scoreMax={evaluation?.scoreMax}
                  oldScore={evaluation.oldScore ? evaluation.oldScore : ''}
                  transcriptId={evaluation?.transcriptId}
                  isExist={evaluation?.isExist}
                />
              </Box>
            ))}
          </Box>
          <Box my={4}>
            <Button
              // onClick={() =>
              //   handleChangeCurrentTranscripts(parseInt(score), value, transcriptId, isExist)
              // }
              variant='contained'
              // disabled={errorMess !== ''}
              size='small'
              color='success'
            >
              <Icon icon='ep:edit-pen' />
              Cập nhật Điểm số
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default ListEvaluation;
