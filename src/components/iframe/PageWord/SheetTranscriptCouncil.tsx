import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';

function SheetTranscriptCouncil(props: any) {
  const { evaluations } = props;
  return (
    <Paper sx={{ p: 4, overflowY: 'auto', height: 650 }} elevation={3}>
      <Box display={'flex'} mx={10} justifyContent={'space-between'} gap={10}>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM <br /> KHOA CÔNG NGHỆ THÔNG TIN <br />
          NGÀNH KỸ THUẬT PHẦN MỀM
        </Typography>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM <br />
          Độc lập - Tự do - Hạnh phúc
        </Typography>
      </Box>
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          Họ tên người đánh giá: ................................................................
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          Vai trò của người đánh giá:  Chấm Poster  Thành viên hội đồng
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          Tên đề tài: ................................................................
        </Typography>
        <Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography my={3} variant='body1' color='initial'>
              Họ tên sinh viên 1:............................
            </Typography>
            <Typography my={3} variant='body1' color='initial'>
              Mã số sinh viên: ................................
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography my={3} variant='body1' color='initial'>
              Họ tên sinh viên 2:............................
            </Typography>
            <Typography my={3} variant='body1' color='initial'>
              Mã số sinh viên: ................................
            </Typography>
          </Box>
          <Box component={'section'}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>STT </StyledTableCell>
                <StyledTableCell align='center'>Nội dung đánh giá (CLO)</StyledTableCell>
                <StyledTableCell align='center'>Điểm tối đa</StyledTableCell>
                <StyledTableCell align='center'>Điểm đánh giá Sinh viên 1</StyledTableCell>
                <StyledTableCell align='center'>Điểm đánh giá Sinh viên 2</StyledTableCell>
                <StyledTableCell align='center'>Các ý kiến nhận xét</StyledTableCell>
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
            Nhận xét khác:
          </Typography>
          <Typography variant='body2' color='initial'>
            ……………………………………………………………………………………………………………………………………………………………………………………………………
            ………………………………………………………………………………………………………………………………………………………………………………………………………………………………
          </Typography>
          <Box display={'flex'} justifyContent={'end'}>
            <Typography component={'i'} textAlign={'center'} my={3} variant='body2' color='initial'>
              TP. HCM, ngày.... tháng... năm ... <br /> <b> Người đánh giá</b> <br />
              (Ký và ghi rõ họ tên) <br />
              .........
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptCouncil;
