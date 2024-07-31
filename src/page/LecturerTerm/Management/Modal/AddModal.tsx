import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { EnumGender, EnumRole } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Autocomplete, Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import SekeletonUI from '@/components/ui/Sekeleton';
import { checkDegree } from '@/utils/validations/lecturer.validation';

const convertToDropValue = (data: any) => {
  if (!data) {
    return [];
  } else return data.map((v: any) => ({ label: v.nameSelect, id: v.lecturerId }));
};
function AddLecturerModal(props: any) {
  const { onClose, open } = props;
  const { termStore } = useTerm();
  const { currentTerm } = termStore;

  const { handleLecturerTermsToAdd, onCreateLecturerTerm } = useLecturerTerm();
  const { data, isLoading, isSuccess: successData, isFetching } = handleLecturerTermsToAdd();
  const { mutate: create, isSuccess: successCreate } = onCreateLecturerTerm();
  const [currentLecturer, setCurrentLecturer] = useState<{ label: string; id: string }>({
    label: '',
    id: '',
  });

  const handleSubmitCreateLecturer = (currentLecturer: any) => {
    const dataSend = {
      lecturerId: currentLecturer.id,
      termId: `${currentTerm.id}`,
    };
    create(dataSend);
  };
  useEffect(() => {
    onClose();
  }, [successCreate]);
  useEffect(() => {
    if (!open) {
      setCurrentLecturer({
        label: '',
        id: '',
      });
    }
  }, [open]);
  return (
    <Modal maxWidth='sm' open={open} onClose={onClose}>
      <Box py={10} px={10}>
        <TitleManager mb={8} variant='h5' textTransform={'uppercase'}>
          Thêm Giảng viên vào học kì
        </TitleManager>
        <Box height={'350px'}>
          {isLoading || isFetching ? (
            <SekeletonUI />
          ) : (
            <>
              <Autocomplete
                disablePortal
                id='lecturer-terms-list'
                options={convertToDropValue(data?.lecturerTerms)}
                onChange={(event: any, newValue: any) => {
                  setCurrentLecturer(newValue);
                }}
                onInputChange={(event, newInputValue) => {}}
                renderInput={(params) => (
                  <>
                    <CustomTextField
                      {...params}
                      placeholder='Nhập vào tên giảng viên'
                      label='DANH SÁCH GV KHOA CÔNG NGHỆ THÔNG TIN'
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
                  Thông tin giảng viên
                </Typography>
                {!currentLecturer || currentLecturer?.id === '' ? (
                  <>
                    <Typography my={10} textAlign={'center'} variant='body1' color='initial'>
                      Chưa chọn giảng viên nào...
                    </Typography>
                  </>
                ) : (
                  <Box>
                    {data?.lecturerTerms
                      .filter((lt: any) => lt.lecturerId === currentLecturer?.id)
                      .map((lecturer: any) => (
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
                            {lecturer.fullName}
                          </Typography>
                          <Divider sx={{ width: '100%', mb: 2 }} />
                          <Box sx={{ my: 6 }}>
                            <Typography variant='body1' color='text.primary'>
                              <strong>Mã GV:</strong> {lecturer.username}
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                              <strong>Email:</strong> {lecturer.email}
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                              <strong>Trình độ:</strong> {checkDegree(lecturer.degree)}
                            </Typography>
                            <Typography variant='body1' color='text.primary'>
                              <strong>Chuyên ngành:</strong> {lecturer.majorName}
                            </Typography>
                          </Box>
                          <Divider sx={{ width: '100%', mb: 2 }} />
                          <Typography variant='body2' color='primary.dark'>
                            {lecturer.nameSelect}
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
            color='error'
            onClick={() => handleSubmitCreateLecturer(currentLecturer)}
            type='submit'
          >
            <Icon icon='material-symbols:save-outline' />
            Thêm GV hướng dẫn
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddLecturerModal;
