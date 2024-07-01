import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';

function SheetTranscriptAdvisor(props: any) {
  const { evaluations } = props;
  return (
    <Paper sx={{ p: 4, overflowY: 'auto', height: 650 }} elevation={3}>
      <Box display={'flex'} mx={10} justifyContent={'center'} gap={10}>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          <b>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM</b>
          <br /> KHOA CÔNG NGHỆ THÔNG TIN <br />
          =======//======
        </Typography>
      </Box>
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          PHIẾU CHẤM ĐIỂM KHÓA LUẬN TỐT NGHIỆP
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          1. Tên đề tài:
          <br />
          <br />
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          2. Nhóm thực hiện:
          <br />
          Họ tên học viên 1: ...............................
          <br />
          Họ tên học viên 2: ...............................
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          3. Họ và tên người chấm điểm: ..............................
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          5. Vai trò của người đánh giá:  GV hướng dẫn  Phản biện  Thành viên HĐ
        </Typography>
        <Box>
          <Typography
            textAlign={'center'}
            my={3}
            variant='body1'
            fontWeight={'bold'}
            color='initial'
          >
            NỘI DUNG ĐÁNH GIÁ
          </Typography>
          <Box component={'section'}>
            <TableHead sx={{ bgcolor: '#d8ecfc' }}>
              <StyledTableRow>
                <StyledTableCell>STT </StyledTableCell>
                <StyledTableCell align='center'>Nội dung</StyledTableCell>
                <StyledTableCell align='center'>Điểm tối đa</StyledTableCell>
                <StyledTableCell align='center'>Điểm đánh giá Sinh viên 1</StyledTableCell>
                <StyledTableCell align='center'>Điểm đánh giá Sinh viên 2</StyledTableCell>
                <StyledTableCell align='center'>CÁC Ý KIẾN NHẬN XÉT</StyledTableCell>
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
            Các ý kiến khác:
          </Typography>
          <Typography variant='body1' color='initial'>
            ……………………………………………………………………………………………………………………………………………………………………………………………………
            ………………………………………………………………………………………………………………………………………………………………………………………………………………………………
          </Typography>
          <Box display={'flex'} justifyContent={'end'}>
            <Typography component={'i'} textAlign={'center'} my={3} variant='body2' color='initial'>
              TP. HCM, ngày.... tháng... năm ... <br />{' '}
              <Typography component={'b'} fontWeight={'bold'}>
                {' '}
                Người chấm điểm{' '}
              </Typography>
              <br />
              (Ký và ghi rõ họ tên) <br />
              .........
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptAdvisor;
