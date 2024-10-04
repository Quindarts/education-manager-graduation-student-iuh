import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import ScoreInput from '@/components/ui/ScoreInput';
import SekeletonUI from '@/components/ui/Sekeleton';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useTranscript from '@/hooks/api/useQueryTranscript';
import { BodyEvaluation } from '@/services/apiTranscipts';
import { Box, Button, Paper, TableBody, TableHead, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
export type MemberScore = {
  studentId: string;
  transcriptId?: string;
  username?: string;
  score: string;
};

export type TranscriptWithEvaluation = {
  evaluationId?: string;
  evaluationName?: string;
  scoreMax?: number;
  score?: number;
  students?: MemberScore[];
};

export type InitTranscriptType = {
  transcripts: TranscriptWithEvaluation[];
  total: number;
  isExistTranscripts: boolean;
};

//[Helper score]
const convertSCore = (score: string) => {
  return score == '' ? 0 : parseInt(score);
};
export const handleTotalScores = (transcripts: TranscriptWithEvaluation[]) => {
  let totalScores: { [key: string]: number }[] = [];
  transcripts.map((transcript: TranscriptWithEvaluation) => {
    transcript['students']?.map((member: { studentId: string; score: string }) => {
      if (!totalScores[`${member?.studentId}`])
        totalScores[`${member?.studentId}`] = convertSCore(member.score);
      else totalScores[`${member?.studentId}`] += convertSCore(member.score);
    });
  });

  return totalScores;
};

//[Helper merge groupstudent and evaluation ]
export var convertEvaluations = (evaluations: any, groupStudent: any) => {
  let transcripts: TranscriptWithEvaluation[] = [];
  if (evaluations) {
    evaluations.map((evl: any) => {
      transcripts.push({
        evaluationId: evl.id,
        evaluationName: evl.name,
        scoreMax: evl.scoreMax,
        students: groupStudent?.map((mem: any) => ({ studentId: mem.student.id, score: '' })),
      });
    });
  }
  return transcripts;
};

//[Helper convert data to request ]
export const convertDataRequest = (
  data: TranscriptWithEvaluation[],
  termId: string,
): BodyEvaluation[] => {
  const convertedScores: BodyEvaluation[] = [];
  data.map((evaluation: TranscriptWithEvaluation) => {
    evaluation?.students?.map((member: MemberScore) => {
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

function TranscriptOfGroupStudent(props: any) {
  const { evaluations, groupStudent, transcriptType } = props;
  const { termStore } = useTerm();

  //[Create constructor of initTranscripts]
  const [initTranscripts, setInitTranscripts] = useState<InitTranscriptType>({
    transcripts: [],
    total: 0,
    isExistTranscripts: false,
  });

  //[Get member of group student need score]
  const { handleGetMemberInGroupStudent } = useMemberGroupStudent();
  const {
    data: memberFetch,
    isLoading: loadingMembers,
    isFetching: fetchingMembers,
    isSuccess: successMember,
    refetch: refetchMembers,
  } = handleGetMemberInGroupStudent(groupStudent.id);

  //[Handler update/ create transcript of group student]
  const { onCreateTranscripts, onUpdateTranscripts, handleGetTranscriptOfStudentInGroup } =
    useTranscript();
  const { mutate: createTranscripts, isSuccess: successCreate } = onCreateTranscripts(
    groupStudent.id,
  );
  const { mutate: updateTranscripts, isSuccess: successUpdate } = onUpdateTranscripts();

  //[Get transcript of group in database]
  const {
    data: transcriptFetch,
    isSuccess: successTranscript,
    isLoading: loadingTranscript,
    isFetching: fetchingTranscript,
    refetch: refetchTranscript,
  } = handleGetTranscriptOfStudentInGroup(transcriptType, groupStudent.id);

  //[Set initTranscripts when fetching success]
  useEffect(() => {
    setScoreStudent([]);
    if (successTranscript && successMember) {
      setInitTranscripts((pre) => ({
        ...pre,
        transcripts:
          transcriptFetch.transcripts.length > 0
            ? transcriptFetch.transcripts
            : convertEvaluations(evaluations, memberFetch?.members),
        isExistTranscripts: transcriptFetch.transcripts.length > 0,
      }));
      setScoreStudent(handleTotalScores(transcriptFetch?.transcripts));
    }
  }, [fetchingTranscript, fetchingMembers, groupStudent.id]);

  //[Toggle total score of students to update]
  //create
  const [scoreStudent, setScoreStudent] = useState<any[]>([]);

  //[Handle Event onChange of score input]
  const handleChangeScore = (studentId: string, score: string, evaluationId: string) => {
    const updateTranscript: TranscriptWithEvaluation[] = initTranscripts.transcripts.map((e) => {
      if (e.evaluationId === evaluationId) {
        return {
          ...e,
          students: e?.students?.map((member) =>
            member.studentId === studentId ? { ...member, score: score } : member,
          ),
        };
      }
      return e;
    });
    setInitTranscripts((pre: any) => ({ ...pre, transcripts: updateTranscript }));
    setScoreStudent(handleTotalScores(updateTranscript));
  };
  //[Saved Create or Update ]
  const handleSubmit = () => {
    let data = convertDataRequest(initTranscripts.transcripts, termStore.currentTerm.id);
    !initTranscripts.isExistTranscripts ? createTranscripts(data) : updateTranscripts(data);
  };
  useEffect(() => {
    if (successCreate || successUpdate) {
      refetchTranscript();
    }
  }, [successCreate, successUpdate]);

  return (
    <>
      {loadingTranscript || fetchingTranscript ? (
        <SekeletonUI />
      ) : (
        <Paper
          elevation={0}
          sx={{
            mt: 10,
          }}
        >
          <Box mx={6}>
            <Typography
              my={3}
              variant='body1'
              textTransform={'uppercase'}
              fontWeight={'700'}
              color='primary.dark'
            >
              <Typography
                component={'span'}
                variant='h6'
                fontWeight={600}
                px={4}
                py={2}
                borderRadius={1}
                marginRight={4}
                bgcolor={'#F1EFEF'}
                color={initTranscripts.isExistTranscripts ? 'warning.main' : 'error.dark'}
              >
                {initTranscripts.isExistTranscripts ? 'Đã chấm' : 'Chưa chấm'}
              </Typography>
              Đề tài : {groupStudent?.topicName}{' '}
            </Typography>
            <Box>
              <Box component={'section'}>
                {/****
                 * HEADER TRANSCRIPT
                 */}
                <TableHead sx={{ bgcolor: '#132e65' }}>
                  <StyledTableRow>
                    <StyledTableCell sx={{ color: 'grey.300', width: '3%', fontSize: 14 }}>
                      CLO{' '}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: 'grey.300', width: '40%', fontSize: 14 }}
                      align='center'
                    >
                      Contents
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: 'grey.300', width: '14%', fontSize: 14 }}
                      align='center'
                    >
                      Max score
                    </StyledTableCell>
                    {!initTranscripts.isExistTranscripts
                      ? memberFetch?.members?.map((st: any) => (
                          <StyledTableCell
                            sx={{ color: 'grey.300', width: '20%', fontSize: 14 }}
                            align='center'
                          >
                            {st.student.fullName}
                          </StyledTableCell>
                        ))
                      : initTranscripts?.transcripts[0]?.students?.map((st: any) => (
                          <StyledTableCell
                            sx={{ color: 'grey.300', width: '20%', fontSize: 14 }}
                            align='center'
                          >
                            {st.fullName}
                          </StyledTableCell>
                        ))}
                  </StyledTableRow>
                </TableHead>
                {/****
                 * UPDATE TRANSCRIPT OF STUDENTS
                 */}
                {initTranscripts.isExistTranscripts === true ? (
                  <TableBody>
                    {initTranscripts?.transcripts.map((row: any, index: number) => (
                      <>
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                          <StyledTableCell component='th' sx={{ fontSize: 14 }} scope='row'>
                            {row.evaluationName}
                          </StyledTableCell>
                          <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                            {row.scoreMax}
                          </StyledTableCell>
                          {row?.students.map((st: any) => (
                            <StyledTableCell sx={{ p: 0 }} align='center'>
                              <ScoreInput
                                handleChangeScore={handleChangeScore}
                                evaluationId={row.evaluationId}
                                studentId={st.studentId}
                                oldScore={st.score}
                                scoreMax={row.scoreMax}
                              />
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      </>
                    ))}
                    <StyledTableRow>
                      <StyledTableCell align='center'></StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        Total
                      </StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        100
                      </StyledTableCell>{' '}
                      {initTranscripts.transcripts[0]?.students?.map((st: any) => (
                        <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                          <Typography variant='h6' fontWeight={'600'} color='error.dark'>
                            {scoreStudent[`${st.studentId}`]}
                          </Typography>
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {/****
                     * CREATE TRANSCRIPT OF STUDENTS
                     */}
                    {initTranscripts.transcripts.map((row: any, index: number) => (
                      <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                        <StyledTableCell component='th' sx={{ fontSize: 14 }} scope='row'>
                          {row.evaluationName}
                        </StyledTableCell>
                        <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                          {row.scoreMax}
                        </StyledTableCell>
                        {memberFetch?.members?.map((st: any) => (
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
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        Total
                      </StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        100
                      </StyledTableCell>{' '}
                      {/**
                       * Total score
                       */}
                      {successMember &&
                        memberFetch.members.map((st: any) => (
                          <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                            <Typography variant='h6' fontWeight={'600'} color='error.dark'>
                              {scoreStudent[`${st.student.id}`]}
                            </Typography>
                          </StyledTableCell>
                        ))}
                    </StyledTableRow>
                  </TableBody>
                )}
                <Box mt={4} justifyContent={'end'} display={'flex'}>
                  <Button
                    onClick={handleSubmit}
                    color={initTranscripts.isExistTranscripts ? 'warning' : 'primary'}
                    type='submit'
                    variant='contained'
                  >
                    {initTranscripts.isExistTranscripts ? 'Cập nhật điểm' : 'Chấm điểm'}
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

export default TranscriptOfGroupStudent;
