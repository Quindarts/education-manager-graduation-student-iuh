import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Autocomplete, Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SekeletonUI from '@/components/ui/Sekeleton';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';

const convertToDropValue = (data: any) => {
  if (!data) {
    return [];
  } else
    return data.map((v: any) => ({ label: `${v.username + ' - ' + v.fullName}`, id: v.studentId }));
};

function AddStudentModal(props: any) {
  const { onClose, open, groupStudentId } = props;

  const [currentStudent, setCurrentStudent] = useState<{ label: string; id: string }>({
    label: '',
    id: '',
  });

  const { handleGetStudentNoHaveGroup } = useGroupStudent();
  const { data, isLoading, isFetching } = handleGetStudentNoHaveGroup();

  const { onAddStudentMember } = useMemberGroupStudent();
  const { mutate: create, isSuccess: successCreate } = onAddStudentMember(groupStudentId);

  useEffect(() => {
    onClose();
  }, [successCreate]);

  useEffect(() => {
    if (!open) {
      setCurrentStudent({
        label: '',
        id: '',
      });
    }
  }, [open]);
  const handleSubmit = (currentLecturer: any) => {
    const dataSend = {
      studentId: currentLecturer.id,
    };
    create(dataSend);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box py={10} px={10}>
        <TitleManager mb={8} variant='h5' textTransform={'uppercase'}>
          Thêm Sinh viên vào nhóm
        </TitleManager>
        <Box height={'350px'}>
          {isLoading || isFetching ? (
            <SekeletonUI />
          ) : (
            <>
              <Autocomplete
                disablePortal
                id='Student-terms-list'
                options={convertToDropValue(data.students)}
                onChange={(event: any, newValue: any) => {
                  setCurrentStudent(newValue);
                }}
                renderInput={(params) => (
                  <>
                    <CustomTextField
                      {...params}
                      placeholder='Nhập vào tên sinh viên'
                      label='Danh sách sinh viên HD khoa CNTT'
                    />
                  </>
                )}
              />
              <Box>
                <Typography
                  textTransform={'uppercase'}
                  mt={20}
                  mb={4}
                  variant='body1'
                  fontWeight={'bold'}
                >
                  Thông tin sinh viên
                </Typography>
                {!currentStudent || currentStudent?.id === '' ? (
                  <>
                    <Typography my={10} textAlign={'center'} variant='body1' color='initial'>
                      Chưa chọn sinh viên nào...
                    </Typography>
                  </>
                ) : (
                  <Box>
                    {data?.students
                      .filter((st: any) => st.studentId === currentStudent?.id)
                      .map((Student: any) => (
                        <Paper
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                            mt: 4,
                          }}
                        >
                          <Typography
                            variant='h6'
                            component='div'
                            gutterBottom
                            sx={{ fontWeight: '500', my: 4 }}
                          >
                            {Student.fullName}
                          </Typography>
                          <Divider sx={{ width: '100%', mb: 2 }} />
                          <Box sx={{ my: 6 }}>
                            <Typography variant='body1' color='text.primary'>
                              <strong>Mã SV:</strong> {Student.username}
                            </Typography>
                          </Box>
                          <Divider sx={{ width: '100%', mb: 2 }} />
                          <Typography variant='body2' color='primary.dark'>
                            {Student.nameSelect}
                          </Typography>
                        </Paper>
                      ))}
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
        <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
          <Button variant='contained' color='primary' onClick={onClose}>
            <Icon icon='mdi:close-outline' />
            Hủy
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => handleSubmit(currentStudent)}
            type='submit'
          >
            <Icon icon='material-symbols:save-outline' />
            Thêm sinh viên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddStudentModal;
