import React from 'react';
import { Table, TableHead, TableRow, TableCell, Box } from '@mui/material';

function LecturerExcelDemo() {
  return (
    <Table>
      <TableHead>
        <TableRow
          sx={{ bgcolor: 'success.dark', color: 'white', fontSize: 12, textAlign: 'center' }}
        >
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>STT</TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Mã GV</TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Họ và tên
          </TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Giới tính
          </TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Giới tính
          </TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
            Số điện thoại
          </TableCell>
          <TableCell sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>Email</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
export default LecturerExcelDemo;
