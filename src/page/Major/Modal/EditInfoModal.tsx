import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import CustomTextField from '@/components/ui/CustomTextField';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { validateSchemaMajor } from './AddModal';

function EditInfoMajorModal(props: any) {
  const { onClose, open, majorId } = props;
  const { handleGetMajorById, onUpdateMajor } = useMajor();

  const { data, isLoading, isFetching } = handleGetMajorById(majorId);

  const { mutate: updateMajor, isSuccess } = onUpdateMajor(majorId);

  const handleSubmitMajor = (values: any) => {
    updateMajor(values);
  };

  useEffect(() => {
    onClose();
  }, [isSuccess]);

  return (
    <Modal maxWidth='xs' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Cập nhật thông tin Chuyên ngành
        </TitleManager>
        {isLoading || isFetching ? (
          <Box m={'auto'} height={300}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            validationSchema={validateSchemaMajor}
            initialValues={{
              name: `${data?.major?.name}`,
            }}
            onSubmit={(values: any) => handleSubmitMajor(values)}
          >
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  label='Tên chuyên ngành'
                  name='name'
                  value={values.name}
                  placeholder='Nhập vào tên chuyên ngành'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name ? true : false}
                  helperText={`${errors.name ? errors.name : ''}`}
                />
                <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon icon='mdi:close-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon icon='material-symbols:save-outline' />
                    Lưu thông tin
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default EditInfoMajorModal;
