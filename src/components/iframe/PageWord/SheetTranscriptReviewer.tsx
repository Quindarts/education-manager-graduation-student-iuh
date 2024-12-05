import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';

function SheetTranscriptReviewer({
  topicName,
  groupStudentName,
  students,
  evaluatorFullName,
  lecturerSupport,
  evaluations,
}: any) {
  return (
    <Paper sx={{ px: 4, overflowY: 'auto', height: 'auto' }} elevation={0}>
      <Box display={'flex'} mx={10} justifyContent={'center'} gap={10}></Box>
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          CAPSTONE PROJECT EVALUATION FORM
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          1. Topic name: {topicName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          2. Instructors: {lecturerSupport}
          <br />
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          3. Team: {groupStudentName}
          <br />
          First student name: {students && students[0]?.fullName} Student code 1:{' '}
          {students && students[0]?.username}
          <br />
          Second student name:{students && students[1]?.fullName} Student code 2:{' '}
          {students && students[1]?.username}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          4. Evaluator's full name: {evaluatorFullName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          5. Role of the evaluator: Reviewer{' '}
        </Typography>
        <Box>
          <Typography
            textAlign={'center'}
            my={3}
            variant='body1'
            fontWeight={'bold'}
            color='initial'
          >
            CONTENTS
          </Typography>
          <Box component={'section'}>
            <TableHead sx={{ bgcolor: '#d8ecfc' }}>
              <StyledTableRow>
                <StyledTableCell>CLO </StyledTableCell>
                <StyledTableCell align='center'>Contents</StyledTableCell>
                <StyledTableCell align='center'>Max score</StyledTableCell>
                <StyledTableCell align='center'>Score student 1</StyledTableCell>
                <StyledTableCell align='center'>Score student 2</StyledTableCell>
                <StyledTableCell align='center'>NOTES</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {convertRowEvaluations(evaluations)?.map(
                (
                  row: { id: string; key: string; name: string; scoreMax: number },
                  index: number,
                ) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell align='center'>{row?.key}</StyledTableCell>
                    <StyledTableCell component='th' scope='row'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{row.scoreMax}</StyledTableCell>
                    <StyledTableCell align='center'>{''}</StyledTableCell>
                    <StyledTableCell align='center'>{''}</StyledTableCell>
                    <StyledTableCell align='center'>{''}</StyledTableCell>
                  </StyledTableRow>
                ),
              )}
            </TableBody>
          </Box>
          <Typography my={3} variant='body2' fontWeight={'bold'} color='initial'>
            Other comments:
          </Typography>
          {/* <Typography variant='body1' color='initial'>
            ....................................................................................................................................................................................
            ....................................................................................................................................................................................
            ....................................................................................................................................................................................
          </Typography>
          <Box display={'flex'} justifyContent={'end'}>
            <Typography component={'i'} textAlign={'center'} my={3} variant='body2' color='initial'>
              Ho Chi Minh City, date month year <br />{' '}
              <Typography component={'b'} fontWeight={'bold'}>
                {' '}
                Evaluator
              </Typography>
              <br />
              <br />
              .........
            </Typography> */}
          {/* </Box> */}
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptReviewer;
