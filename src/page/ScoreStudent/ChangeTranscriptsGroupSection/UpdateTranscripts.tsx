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
import { convertData } from '.';

function UpdateTranscripts(props: any) {
  const { termStore, groupStudent } = useTerm();
  //handler
  const { onCreateTranscripts, handleGetTranscriptOfStudentInGroup } = useQueryTranscript();
  const { mutate: createTranscripts, isSuccess: successCreate } = onCreateTranscripts(
    groupStudent.id,
  );
  const handleSubmit = () => {
    let data = convertData(initTranscripts.transcripts, termStore.currentTerm.id);
    createTranscripts(data);
  };
  const { initTranscripts } = props;
  return (
    <Box component={'section'}>
      <TableHead sx={{ bgcolor: '#132e65' }}>
        <StyledTableRow>
          <StyledTableCell sx={{ color: 'grey.300', width: '5%', fontSize: 12 }}>
            CLO{' '}
          </StyledTableCell>
          <StyledTableCell sx={{ color: 'grey.300', width: '40%', fontSize: 12 }} align='center'>
            Contents
          </StyledTableCell>
          <StyledTableCell sx={{ color: 'grey.300', width: '10%', fontSize: 12 }} align='center'>
            Max score
          </StyledTableCell>
          {memberFetch?.members.map((st: any) => (
            <StyledTableCell sx={{ color: 'grey.300', width: '20%', fontSize: 12 }} align='center'>
              {st.student.fullName}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {initTranscripts.transcripts.map((row: TranscriptWithEvaluation, index: number) => (
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
  );
}

export default UpdateTranscripts;
