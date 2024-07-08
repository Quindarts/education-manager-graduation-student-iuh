import { Paper } from '@mui/material';
import React from 'react';
import TableManagementRole from './Management/Table';
import TitleManager from '@/components/ui/Title';

function RolePermissionPage() {
  return (
    <Paper sx={{ p: 10 }}>
      <TitleManager sx={{ mb: 8 }} icon='heroicons:user-group'>
        Danh sách Người dùng
      </TitleManager>
      <TableManagementRole rows={[]} />
    </Paper>
  );
}

export default RolePermissionPage;
