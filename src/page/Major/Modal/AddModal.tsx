import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import CustomTextField from '@/components/ui/CustomTextField';
import { useMajor } from '@/hooks/api/useQueryMajor';
import * as Yup from 'yup';

export const validateSchemaMajor = Yup.object().shape({
  name: Yup.string().matches(
    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\s]+$/,
    'Tên chuyên ngành chỉ bao gồm chữ cái in hoa và in thường.',
  ),
});

function AddMajorModal(props: any) {
  const { onClose, open } = props;
  const { onCreateMajor } = useMajor();
  const { mutate: createMajor, isSuccess } = onCreateMajor();

  const handleSubmitMajor = (values: any) => {
    createMajor(values);
  };

  useEffect(() => {
    onClose();
  }, [isSuccess]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} textTransform={'uppercase'}>
          Tạo Chuyên ngành
        </TitleManager>

        <Formik
          validationSchema={validateSchemaMajor}
          initialValues={{
            name: ``,
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
      </Box>
    </Modal>
  );
}

export default AddMajorModal;
