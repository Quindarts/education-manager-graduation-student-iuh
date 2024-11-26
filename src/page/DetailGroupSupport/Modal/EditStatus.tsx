import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DROP_STATUS_STUDENT_TERM_VALUE = [
  {
    _id: 'OPEN',
    name: 'Đang học',
  },
  {
    _id: 'FAIL_ADVISOR',
    name: 'Rớt hướng dẫn',
  },
  {
    _id: 'FAIL_REVIEWER',
    name: 'Rớt phản biện',
  },
  {
    _id: 'FAIL_REPORT',
    name: 'Rớt hội đồng',
  },
  {
    _id: 'PASS_ADVISOR',
    name: 'Đậu hướng dẫn',
  },
  {
    _id: 'PASS_REVIEWER',
    name: 'Đậu phản biện',
  },
  {
    _id: 'PASS_REPORT',
    name: 'Đậu hội đồng',
  },
];

function EditStatusStudentTerm(props: any) {
  const { onClose, open, studentId, status } = props;

  const [checked, setChecked] = useState(status);
  const { termStore } = useTerm();

  const { pathname } = useLocation();

  const current = pathname.split('/');

  const grStudentId = `${current[current.length - 1]}`;
  const { onUpdateStatusStudentMember } = useMemberGroupStudent();
  const { mutate: updateStatus, isSuccess } = onUpdateStatusStudentMember(grStudentId, studentId);

  useEffect(() => {
    onClose();
  }, [isSuccess]);

  const handleUpdate = () => {
    updateStatus({
      status: checked,
      termId: termStore.currentTerm.id,
    });
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box m={10}>
        <Typography mb={4} fontWeight={600} variant='h3'>
          Cập nhật trạng thái sinh viên
        </Typography>
        <Box my={10}>
          <DropDown
            onChange={(e) => {
              setChecked(e.target.value);
            }}
            value={checked}
            defaultChecked={status}
            options={DROP_STATUS_STUDENT_TERM_VALUE}
          />
        </Box>
        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '50%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            sx={{ width: '50%' }}
            onClick={handleUpdate}
            variant='contained'
            color={'success'}
          >
            <Icon width={20} icon='radix-icons:update' />
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditStatusStudentTerm;
