import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useRoleManager } from '@/hooks/api/useQueryRole';
import { RoleCheck } from '@/types/enum';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import CardRole from '../../Card';
import { Icon } from '@iconify/react';
import { useAuth } from '@/hooks/api/useAuth';
const LIST_ROLE = [
  RoleCheck.ADMIN,
  RoleCheck.HEAD_LECTURER,
  RoleCheck.LECTURER,
  RoleCheck.HEAD_COURSE,
];
function EditRoleModal(props: any) {
  const { onClose, open, lecturerId, lecturerName, username } = props;
  const { handleGetRoleDetailByLecturerId } = useRoleManager();
  const { data, isLoading, isFetching } = handleGetRoleDetailByLecturerId(lecturerId);
  const { lecturerStore } = useAuth();
  const currentRole = lecturerStore.currentRoleRender;

  const LIST_RENDER =
    currentRole === RoleCheck.ADMIN ? LIST_ROLE : [RoleCheck.HEAD_COURSE, RoleCheck.LECTURER];
  return (
    <Modal maxWidth='md' open={open} onClose={onClose}>
      <Box py={10} px={10}>
        <TitleManager mb={8} icon='tdesign:user-setting' variant='h5' textTransform={'uppercase'}>
          Cập nhật vai trò (quyền)
        </TitleManager>

        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <>
            <Paper sx={{ px: 6, py: 4 }} elevation={1}>
              <Box mb={6}>
                <Typography variant='h5' color='grey.700'>
                  Tên GV: {lecturerName}
                </Typography>
                <Typography variant='h5' color='grey.700'>
                  Mã giảng viên: {username}
                </Typography>
              </Box>

              {LIST_RENDER.map((role: any, index: number) => (
                <CardRole
                  lecturerId={lecturerId}
                  roleAssigned={data && data?.roles.filter((mRole: any) => mRole.name === role)[0]}
                  roleName={role}
                  handleClose={onClose}
                  key={index}
                  currentRole={currentRole}
                />
              ))}
            </Paper>
          </>
        )}
        <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
          <Button variant='contained' color='primary' onClick={onClose}>
            <Icon icon='mdi:close-outline' />
            Thoát
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default EditRoleModal;
