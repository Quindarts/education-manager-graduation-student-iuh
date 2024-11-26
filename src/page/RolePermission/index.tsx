import { Paper } from '@mui/material';
import React from 'react';
import TableManagementRole from './Management/Table';
import TitleManager from '@/components/ui/Title';
import { useRoleManager } from '@/hooks/api/useQueryRole';
import SekeletonUI from '@/components/ui/Sekeleton';

function RolePermissionPage() {
  const { handleGetAllRoleLecturer } = useRoleManager();
  const { data, isLoading, isFetching } = handleGetAllRoleLecturer();
  return (
    <Paper sx={{ p: 10 }} elevation={0}>
      <TitleManager sx={{ mb: 8 }} icon='heroicons:user-group'>
        Danh sách Người dùng
      </TitleManager>
      {isFetching || isLoading ? (
        <SekeletonUI />
      ) : (
        <TableManagementRole rows={data?.roles ? data.roles : []} />
      )}
    </Paper>
  );
}

export default RolePermissionPage;
