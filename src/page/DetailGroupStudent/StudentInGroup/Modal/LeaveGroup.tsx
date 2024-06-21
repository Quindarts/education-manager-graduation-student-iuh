import Modal from '@/components/ui/Modal';
import useMemberGroupStudent from '@/hooks/api/useMemberGroupStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function StudentLeaveGroup(props: any) {
  const { onClose, open, studentId } = props;
  const { termStore } = useTerm();
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;
  const { onDeleteStudentMember } = useMemberGroupStudent();
  const { mutate: deleteMem, isSuccess } = onDeleteStudentMember(grStudentId);

  const handleDeleteStudentMember = () => {
    deleteMem({ studentId: studentId, termId: termStore.currentTerm.id });
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
        <Typography variant='h3' mt={10} mb={14}>
          Xóa sinh viên ra khỏi nhóm ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            onClick={handleDeleteStudentMember}
            type='submit'
            sx={{ width: '50%' }}
            color='error'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='fluent-mdl2:leave' />
            Xóa Sinh viên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default StudentLeaveGroup;
