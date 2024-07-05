import ScoreInput from '@/components/ui/ScoreInput';
import SekeletonUI from '@/components/ui/Sekeleton';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
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
function AccordionListScore(props: any) {
  const { student, evaluations } = props;
  const [initTranscripts, setInitTranscripts] = useState({
    newEvaluation: [],
    total: 0,
  });
  const { handleGetTranscriptsByTypeEvaluation } = useQueryTranscript();
  const {
    data: dataTranscripts,
    isLoading,
    isFetching,
  } = handleGetTranscriptsByTypeEvaluation('advisor', student.studentId);
  const { onCreateTranscript, onUpdateTranscript } = useQueryTranscript();

  const { mutate: createTranscript, isSuccess: successCreate } = onCreateTranscript(
    student.studentId,
    'advisor',
  );
  const { mutate: updateTranscript, isSuccess: successUpdate } = onUpdateTranscript(
    student.studentId,
    'advisor',
  );
  const handleChangeCurrentTranscripts = (
    score: number,
    value: string,
    transcriptId?: string,
    isExistOldScore?: boolean,
  ) => {
    if (isExistOldScore === false || isExistOldScore === undefined) {
      createTranscript({
        studentId: student.studentId,
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
  useEffect(() => {
    setInitTranscripts({ newEvaluation: [], total: 0 });
    if (dataTranscripts !== undefined) {
      setInitTranscripts(checkIsExistTranscripts(evaluations, dataTranscripts?.transcripts));
    }
  }, [successCreate, isFetching, successUpdate, student]);
  const maxScore = evaluations
    .map((evl: any) => evl.scoreMax)
    .reduce((score1: number, score2: number) => score1 + score2, 0);

  return (
    <>
      <Accordion sx={{ mb: 4 }}>
        <AccordionSummary
          sx={{ bgcolor: 'grey.100' }}
          expandIcon={<GridExpandMoreIcon color='primary' />}
        >
          <Box display={'flex'} gap={4}>
            <Icon width={20} icon='flat-color-icons:folder' />

            <Typography fontWeight={'500'} color={'primary.main'} variant='body1'>
              {student.fullName} - MSSV: {student.username}
            </Typography>

            <Typography
              justifyContent={'end'}
              fontWeight={'500'}
              color={'grey.500'}
              variant='body1'
            >
              Nhóm Sinh viên {student.groupStudentName}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading || isFetching ? (
            <SekeletonUI />
          ) : (
            <Box display={'flex'} flexDirection={'column'} gap={4}>
              {initTranscripts.newEvaluation.map((evaluation: any, key: number) => (
                <ScoreInput
                  handleChangeCurrentTranscripts={handleChangeCurrentTranscripts}
                  value={evaluation.id}
                  name={evaluation?.name}
                  studentId={student.studentId}
                  scoreMax={evaluation?.scoreMax}
                  oldScore={evaluation.oldScore ? evaluation.oldScore : ''}
                  transcriptId={evaluation?.transcriptId}
                  isExist={evaluation?.isExist}
                />
              ))}
              <Box my={4} display={'flex'} gap={100} alignSelf={'end'} py={4} px={0}>
                <Typography fontWeight={'500'} variant='h5' color='error'>
                  Tổng Điểm :{initTranscripts.total} / {maxScore}{' '}
                </Typography>
              </Box>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AccordionListScore;
