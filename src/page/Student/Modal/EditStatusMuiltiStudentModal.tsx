import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';

interface EditStatusMuiltiStudentPropsType {
  listStudent: any[];
  rows: any[];
  open: boolean;
  onClose: () => void;
}

function EditStatusMuiltiStudent(props: EditStatusMuiltiStudentPropsType) {
  const { listStudent, rows, open, onClose } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Box m={10}>
        <TitleManager mb={10} fontWeight={600} variant='h3'>
          Khóa hoặc mở khóa toàn bộ Sinh viên đã chọn ?
        </TitleManager>
        <Box>
          {rows
            .filter((item: any) => listStudent.includes(item.id))
            .map((student: any) => (
              <Box sx={{ px: 6, py: 4, bgcolor: 'grey.200', borderRadius: 4, my: 4 }}>
                <Typography variant='body1' color='initial'>
                  {student.fullName} {'- - '}
                  mssv: {student.username}
                </Typography>
              </Box>
            ))}
        </Box>
        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '50%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button type='submit' sx={{ width: '70%' }} variant='contained' color='success'>
            <Icon width={20} style={{ marginRight: 2 }} icon='dashicons:update-alt' />
            Khóa ( hoặc mở khóa) sinh viên này
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditStatusMuiltiStudent;
