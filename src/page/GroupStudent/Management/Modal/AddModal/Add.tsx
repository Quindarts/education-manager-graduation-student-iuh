import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import TaskAddStudent from './Task';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { enqueueSnackbar } from 'notistack';
import SekeletonUI from '@/components/ui/Sekeleton';

function AddGroupStudentModal(props: any) {
  const { onClose, open } = props;
  const { handleGetCountOfGroupStudent, onCreateGroupStudent } = useGroupStudent();
  const { data, isFetching, isLoading, isSuccess } = handleGetCountOfGroupStudent();
  const { mutate: createGroup, isSuccess: successCreate } = onCreateGroupStudent();
  const [dataSend, setDataSend] = useState([]);

  const handleSetData = (data: any) => {
    setDataSend(data);
  };
  const handleSubmit = () => {
    if (dataSend.length < 1) {
      enqueueSnackbar('Nhóm sinh viên tạo trống', { variant: 'error' });
    } else {
      const studentIds = dataSend.map((std: any) => std.studentId);
      createGroup(studentIds);
    }
  };
  useEffect(() => {
    if (successCreate) {
      onClose();
    }
  }, [successCreate]);
  return (
    <Modal maxWidth='xl' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo Nhóm sinh viên mới
        </TitleManager>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <>
            <Box>
              <CustomTextField
                label='Tên nhóm sinh viên'
                disabled
                value={isSuccess ? data.nameCount : ''}
              />
            </Box>
            <Paper elevation={1} sx={{ mt: 10, p: 10 }}>
              <TaskAddStudent
                handleSetData={handleSetData}
                nameGroup={isSuccess ? data.nameCount : ''}
              />
              <Typography mt={4} variant='body1' color='error'>
                **Chú thích: Kéo thả sinh viên trong danh sách sinh viên sang nhóm mới để thêm sinh
                viên vào nhóm.
              </Typography>
            </Paper>
          </>
        )}

        <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
          <Button variant='contained' color='primary' onClick={onClose}>
            <Icon icon='mdi:close-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} variant='contained' color='success'>
            <Icon icon='material-symbols:save-outline' />
            Lưu thông tin
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddGroupStudentModal;
