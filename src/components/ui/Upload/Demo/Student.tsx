import { Box } from '@mui/material';
import { Table, TableHead, TableRow, TableCell } from '@mui/material';
import React from 'react';

function StudentExcelDemo() {
  return (
    <Table>
      <TableHead>
        <TableRow
          sx={{ bgcolor: 'success.dark', color: 'white', fontSize: 12, textAlign: 'center' }}
        >
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>STT</TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Mã SV</TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Họ đệm</TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Tên</TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Giới tính
          </TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Số điện thoại
          </TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Lớp học</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}

export default StudentExcelDemo;
