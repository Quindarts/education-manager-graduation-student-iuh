import { Paper } from '@mui/material';
import React from 'react';
import TableManagementRole from './Management/Table';
import TitleManager from '@/components/ui/Title';
import { useRoleManager } from '@/hooks/api/useQueryRole';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useAuth } from '@/hooks/api/useAuth';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { removeVietnameseTones } from '@/utils/search';
import { useMajor } from '@/hooks/api/useQueryMajor';

function RolePermissionPage() {
  const { handleGetAllRoleLecturer } = useRoleManager();
  const { data, isLoading, isFetching } = handleGetAllRoleLecturer();
  const { majorStore } = useMajor();
  const majorName = majorStore.currentMajor.name.toLowerCase();
  const majorValidator = removeVietnameseTones(majorName).toString().trim();
  return (
    <Paper sx={{ p: 10 }} elevation={0}>
      <TitleManager sx={{ mb: 8 }}>Danh sách Người dùng</TitleManager>
      {isFetching || isLoading ? (
        <SekeletonUI />
      ) : (
        <TableManagementRole
          rows={
            data?.roles
              ? data.roles.filter(
                  (user) =>
                    removeVietnameseTones(user.majorName.toLowerCase()).toString().trim() ===
                    majorValidator,
                )
              : []
          }
        />
      )}
    </Paper>
  );
}

export default RolePermissionPage;
