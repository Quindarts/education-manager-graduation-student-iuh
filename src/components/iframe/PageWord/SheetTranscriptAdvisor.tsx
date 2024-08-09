import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';
import { useAuth } from '@/hooks/api/useAuth';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import { useGlobalContextReview } from '@/page/ReviewManager/Context';

function SheetTranscriptAdvisor(props: any) {
  const { evaluations } = props;
  const { handleUiRender } = useEvaluation();
  const { topic, lecturerSupportName, groupStudentName, lecturerToScoreName, groupMember } =
    useGlobalContextReview();

  return (
    <Paper sx={{ p: 4, overflowY: 'auto', height: 650 }} elevation={3}>
      {/* 
      <Box display={'flex'} mx={10} justifyContent={'center'} gap={10}>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          <b>INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY</b>
          <br /> FACULTY OF INFORMATION TECHNOLOGY <br />
          =======//======
        </Typography>
      </Box> */}
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          CAPSTONE PROJECT EVALUATION FORM
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          1. Topic name: {topic?.name}
          <br />
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          2. Instructors:
          <br />
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          3. Team: {groupStudentName}
          <br />
          <Box>
            <Typography component={'span'} variant='body1' fontWeight={'500'} color='initial'>
              First student:{' '}
            </Typography>
            {groupMember ? groupMember[0]?.student?.fullName : '......................'}
            <Box ml={14} display={'inline'}>
              Student code 1:
              {groupMember ? groupMember[0]?.student?.username : '......................'}
            </Box>
          </Box>
          <Typography component={'span'} variant='body1' fontWeight={'500'} color='initial'>
            Second student:{' '}
          </Typography>
          {groupMember ? groupMember[1]?.student?.fullName : '......................'}
          <Box ml={14} display={'inline'}>
            Student code 2:{' '}
            {groupMember ? groupMember[1]?.student?.username : '......................'}{' '}
          </Box>
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          4. Evaluator's: {lecturerToScoreName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          5. Role of the evaluator: Instructor{' '}
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
                (row: { id: string; name: string; scoreMax: number }, index: number) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell align='center'>{index + 1}</StyledTableCell>
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
          <Typography variant='body1' color='initial'>
            ................................................................................................................
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
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptAdvisor;
