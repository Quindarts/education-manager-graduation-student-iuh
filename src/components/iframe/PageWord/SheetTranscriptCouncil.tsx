import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';

function SheetTranscriptCouncil(props: any) {
  const { evaluations } = props;
  return (
    <Paper sx={{ p: 4, overflowY: 'auto', height: 650 }} elevation={3}>
      <Box display={'flex'} mx={10} justifyContent={'space-between'} gap={10}>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY <br />
          FACULTY OF INFORMATION TECHNOLOGY <br />
          SOFTWARE ENGINEER MAJOR
        </Typography>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          CONG HOA XA HOI CHU NGHIA VIETNAM <br />
          Doc lap - Tu do - Hanh phuc
        </Typography>
      </Box>
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          GRADUATION THESIS EVALUATION FORM
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          Evaluator's full name:
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          Role of evaluator:  Poster Evaluator  Member of Council{' '}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          Topic name:
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          First student name:
        </Typography>{' '}
        <Typography my={3} variant='body1' color='initial'>
          Second student name:
        </Typography>
        <Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography my={3} variant='body1' color='initial'>
              First student name: ............................
            </Typography>
            <Typography my={3} variant='body1' color='initial'>
              Student code 1: ............................
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography my={3} variant='body1' color='initial'>
              Second student name: ............................
            </Typography>
            <Typography my={3} variant='body1' color='initial'>
              Student code 2: ............................
            </Typography>
          </Box>
          <Box component={'section'}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>STT </StyledTableCell>
                <StyledTableCell align='center'>CLO</StyledTableCell>
                <StyledTableCell align='center'>Max point</StyledTableCell>
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
            ....................................................................................................................................................................................
            ....................................................................................................................................................................................
            ....................................................................................................................................................................................
          </Typography>
          <Box display={'flex'} justifyContent={'end'}>
            <Typography component={'i'} textAlign={'center'} my={3} variant='body2' color='initial'>
              Ho Chi Minh City, date month year <br /> <b> Evaluator</b> <br />
              .........
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptCouncil;
