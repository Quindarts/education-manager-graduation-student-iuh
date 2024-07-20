import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import ScoreInput from '@/components/ui/ScoreInput';
import SekeletonUI from '@/components/ui/Sekeleton';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import { BodyEvaluation } from '@/services/apiTranscipts';
import { Box, Button, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

const convertSCore = (score: string) => {
  return score == '' ? 0 : parseInt(score);
};
const handleTotalScores = (transcripts: TranscriptWithEvaluation[]) => {
  let totalScores: { [key: string]: number }[] = [];
  transcripts.map((transcript: TranscriptWithEvaluation) => {
    transcript['members']?.map((member: { studentId: string; score: string }) => {
      if (!totalScores[`${member?.studentId}`])
        totalScores[`${member?.studentId}`] = convertSCore(member.score);
      else totalScores[`${member?.studentId}`] += convertSCore(member.score);
    });
  });
  return totalScores;
};

type MemberScore = {
  studentId: string;
  score: string;
};

export type TranscriptWithEvaluation = {
  evaluationId?: string;
  evaluationName?: string;
  scoreMax?: number;
  members?: MemberScore[];
};

export type InitTranscriptType = {
  transcripts: TranscriptWithEvaluation[];
  total: number;
  isExistTranscripts: boolean;
};

export var convertEvaluations = (evaluations: any, groupStudent: any) => {
  let transcripts: TranscriptWithEvaluation[] = [];
  if (evaluations) {
    evaluations.map((evl: any) => {
      transcripts.push({
        evaluationId: evl.id,
        evaluationName: evl.name,
        scoreMax: evl.scoreMax,
        members: groupStudent?.map((mem: any) => ({ studentId: mem.student.id, score: '' })),
      });
    });
  }
  return transcripts;
};

export const convertData = (data: TranscriptWithEvaluation[], termId: string): BodyEvaluation[] => {
  const convertedScores: BodyEvaluation[] = [];

  data.map((evaluation: TranscriptWithEvaluation) => {
    evaluation?.members?.map((member: MemberScore) => {
      convertedScores.push({
        score: parseInt(member.score) || 0,
        evaluationId: evaluation.evaluationId,
        studentId: member.studentId,
        termId: termId,
      });
    });
  });

  return convertedScores;
};

function TranscriptGroupStudent(props: any) {
  const { evaluations, groupStudent, transcriptType } = props;
  const { termStore } = useTerm();
  const { handleGetMemberInGroupStudent } = useMemberGroupStudent();

  const {
    data: memberFetch,
    isLoading: loadingStudent,
    isFetching: fetchingMembers,
    isSuccess: successMember,
  } = handleGetMemberInGroupStudent(groupStudent.id);

  const [initTranscripts, setInitTranscripts] = useState<InitTranscriptType>({
    transcripts: [],
    total: 0,
    isExistTranscripts: false,
  });

  //handler
  const { onCreateTranscripts, handleGetTranscriptOfStudentInGroup } = useQueryTranscript();
  const { mutate: createTranscripts, isSuccess: successCreate } = onCreateTranscripts(
    groupStudent.id,
  );
  const {
    data: transcriptFetch,
    isSuccess,
    isLoading,
    isFetching,
  } = handleGetTranscriptOfStudentInGroup(transcriptType, groupStudent.id);

  useEffect(() => {
    if (isSuccess && successMember) {
      setInitTranscripts((pre) => ({
        ...pre,
        transcripts: convertEvaluations(evaluations, memberFetch?.members),
        isExistTranscripts: transcriptFetch.transcripts.length > 0,
      }));
    }
  }, [isFetching, fetchingMembers]);

  const [scoreStudent, setScoreStudent] = useState<any[]>([]);

  const handleChangeScore = (studentId: string, score: string, evaluationId: string) => {
    const updateTranscript: TranscriptWithEvaluation[] = initTranscripts.transcripts.map(
      (evaluation) => {
        if (evaluation.evaluationId === evaluationId) {
          return {
            ...evaluation,
            members: evaluation?.members?.map((member) =>
              member.studentId === studentId ? { ...member, score: score } : member,
            ),
          };
        }
        return evaluation;
      },
    );
    setInitTranscripts((pre: any) => ({ ...pre, transcripts: updateTranscript }));
    setScoreStudent(handleTotalScores(updateTranscript));
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    if (initTranscripts.isExistTranscripts === false) {
      let data = convertData(initTranscripts.transcripts, termStore.currentTerm.id);
      createTranscripts(data);
    } else {
      enqueueSnackbar('Tính năng cập nhật điểm đang cập nhật', { variant: 'warning' });
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <Paper sx={{ p: 4 }}>
          <Box>
            {initTranscripts.isExistTranscripts && (
              <Typography
                px={10}
                py={4}
                width={150}
                textAlign={'center'}
                borderRadius={4}
                color='white'
                bgcolor='success.main'
                variant='body1'
              >
                Đã chấm điểm
              </Typography>
            )}
          </Box>
          <Box>
            <Typography
              textAlign={'center'}
              my={3}
              variant='h6'
              fontWeight={800}
              color='primary.dark'
            >
              CAPSTONE PROJECT EVALUATION FORM
            </Typography>
          </Box>

          <Box mx={6}>
            <Typography my={3} textAlign={'center'} variant='h5' color='initial'>
              Topic: {groupStudent?.topicName}
            </Typography>
            <Box>
              <Typography textAlign={'center'} variant='h5' fontWeight={'bold'} color='initial'>
                CONTENTS
              </Typography>
              <Box component={'section'}>
                <TableHead sx={{ bgcolor: '#132e65' }}>
                  <StyledTableRow>
                    <StyledTableCell sx={{ color: 'grey.300', width: '5%', fontSize: 12 }}>
                      CLO{' '}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: 'grey.300', width: '40%', fontSize: 12 }}
                      align='center'
                    >
                      Contents
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: 'grey.300', width: '10%', fontSize: 12 }}
                      align='center'
                    >
                      Max score
                    </StyledTableCell>
                    {memberFetch?.members.map((st: any) => (
                      <StyledTableCell
                        sx={{ color: 'grey.300', width: '20%', fontSize: 12 }}
                        align='center'
                      >
                        {st.student.fullName}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {initTranscripts.transcripts.map((row: any, index: number) => (
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                      <StyledTableCell component='th' sx={{ fontSize: 14 }} scope='row'>
                        {row.evaluationName}
                      </StyledTableCell>
                      <StyledTableCell align='center' sx={{ fontSize: 16 }}>
                        {row.scoreMax}
                      </StyledTableCell>

                      {memberFetch?.members.map((st: any) => (
                        <StyledTableCell sx={{ p: 0 }} align='center'>
                          <ScoreInput
                            handleChangeScore={handleChangeScore}
                            evaluationId={row.evaluationId}
                            studentId={st.student.id}
                            oldScore={0}
                            scoreMax={row.scoreMax}
                          />
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                    <StyledTableCell align='center'></StyledTableCell>{' '}
                    <StyledTableCell align='center' sx={{ fontSize: 16, fontWeight: 'bold' }}>
                      Total
                    </StyledTableCell>{' '}
                    <StyledTableCell align='center' sx={{ fontSize: 16, fontWeight: 'bold' }}>
                      100
                    </StyledTableCell>{' '}
                    {successMember &&
                      memberFetch.members.map((st: any) => (
                        <StyledTableCell align='center' sx={{ fontSize: 16 }}>
                          <Typography variant='body1' color='initial'>
                            {scoreStudent[`${st.student.id}`]}
                          </Typography>
                        </StyledTableCell>
                      ))}
                  </StyledTableRow>
                </TableBody>
                <Box mt={4} justifyContent={'end'} display={'flex'}>
                  <Button onClick={handleSubmit} type='submit' variant='contained'>
                    Cập nhật Điểm
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default TranscriptGroupStudent;
