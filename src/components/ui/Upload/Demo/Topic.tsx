import React from 'react';
import { Table, Box, TableHead, TableRow, TableCell } from '@mui/material';

function TopicExcelDemo() {
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow
            sx={{ bgcolor: 'success.dark', color: 'white', fontSize: 12, textAlign: 'center' }}
          >
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              Mã đề tài
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              Mã giảng viên
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              Họ tên giảng viên
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              Tên đề tài
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              MỤC TIÊU ĐỀ TÀI
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              DỰ KIẾN SẢN PHẨM NGHIÊN CỨU CỦA ĐỀ TÀI VÀ KHẢ NĂNG ỨNG DỤNG
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Mô tả</TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              Yêu cầu đầu vào
            </TableCell>
            <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
              Yêu cầu đầu ra (Output Standards)
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Box>
  );
}

export default TopicExcelDemo;
