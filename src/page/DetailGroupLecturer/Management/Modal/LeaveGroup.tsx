import Modal from '@/components/ui/Modal';
import useMemberGroupLecturer from '@/hooks/api/useQueryMemberGroupLecturer';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LecturerLeaveGroupModal(props: any) {
  const { onClose, open, lecturerId, countOfMembers } = props;
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const navigate = useNavigate();
  const grLecturerId = `${current[current.length - 1]}`;
  const { onRemoveMemberFromGroupLecturer } = useMemberGroupLecturer();
  const { mutate: deleteMem, isSuccess } = onRemoveMemberFromGroupLecturer(grLecturerId);

  const handleDeleteLecturerMember = () => {
    if (countOfMembers === 1) {
      navigate('/group-lecturers');
    }
    deleteMem({ lecturerId });
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal onClose={onClose} open={open}>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box
          borderRadius='50%'
          width={100}
          height={100}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ background: 'rgba(255,49,111,0.2)' }}
        >
          <Icon color='#b31d1d82' width={70} icon='fluent-mdl2:leave' />{' '}
        </Box>
        <Typography variant='h6' textAlign={'center'} mt={10} mb={14}>
          {countOfMembers === 1
            ? 'Nhóm sẽ bị xóa khi không có thành viên.Bạn có chắc chắn muốn xóa giảng viên cuối cùng ra khỏi nhóm ? '
            : ' Xóa giảng viên ra khỏi nhóm'}
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            onClick={handleDeleteLecturerMember}
            type='submit'
            sx={{ width: '50%' }}
            color='error'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='fluent-mdl2:leave' />
            {countOfMembers === 1 ? 'Xóa nhóm, giảng viên ' : ' Xóa giảng viên'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LecturerLeaveGroupModal;
